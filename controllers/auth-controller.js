import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";

import User from "../models/User.js";

import { ctrlWrapper } from "../decorators/index.js";
import { HttpError, sendEmail } from "../helpers/index.js";

const { JWT_SECRET, BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, `User with email - ${email}, already exist`);
  }

  const hashPass = await bcrypt.hash(password, 10);
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPass,
    verificationToken,
  });

  const payload = {
    id: newUser._id,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(newUser._id, { token });

  // const verifyEmail = {
  //   to: email,
  //   subject: "Verify email",
  //   html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click verify email</a>`,
  // };

  // await sendEmail(verifyEmail);

  res.status(201).json({
    token,
    user: {
      email: newUser.email,
      name: newUser.name,
      gender: newUser.gender,
      avatarURL: newUser.avatarURL,
      waterRate: newUser.waterRate,
    },
  });
};

// const verify = async (req, res) => {
//   const { verificationToken } = req.params;
//   const user = await User.findOne({ verificationToken });
//   if (!user) {
//     throw HttpError(404, "User not found");
//   }

//   await User.findByIdAndUpdate(user._id, {
//     verify: true,
//     verificationToken: "_",
//   });

//   res.json({
//     message: "Verification successful",
//   });
// };

// const resendVerify = async (req, res) => {
//   const { email } = req.body;
//   const user = await User.findOne({ email });

//   if (!user) {
//     throw HttpError(401, "Email not found");
//   }

//   if (user.verify) {
//     throw HttpError(400, "Verification has already been passed");
//   }

//   const verifyEmail = {
//     to: email,
//     subject: "Verify email",
//     html: `<a target="_blank" href="${BASE_URL}/users/verify/${user.verificationToken}">Click verify email</a>`,
//   };

//   await sendEmail(verifyEmail);

//   res.json({
//     message: "Verification email sent",
//   });
// };

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  // if (!user.verify) {
  //   throw HttpError(401, "Email not verify");
  // }

  const passCompare = await bcrypt.compare(password, user.password);
  if (!passCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email: user.email,
      name: user.name,
      gender: user.gender,
      avatarURL: user.avatarURL,
      waterRate: user.waterRate,
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
};

const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  const resetToken = nanoid();
  const resetTokenExpire = Date.now() + 3600000;

  const updatedUser = await User.findOneAndUpdate(
    { email },
    {
      resetToken: resetToken,
      resetTokenExpire: resetTokenExpire,
    },
    { new: true }
  );

  if (!updatedUser) {
    throw HttpError(404, "User not found");
  }

  const userName = updatedUser.name ? updatedUser.name : "user";

  const resetLink = `${BASE_URL}/auth/reset-pass?token=${resetToken}`;

  await sendEmail({
    to: email,
    subject: "Password Reset",
    html: ` <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f7fa;">
      <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
       <div style="text-align: center;">
        <a href="${BASE_URL}">
          <img src="https://yanlozovskyi.github.io/water-tracker/assets/Logo-890d13ba.png" alt="Logo" style="max-width: 100px; margin: 0 auto;">
          </a>
        </div>
        <h2 style="color: #407BFF; font-size: 24px; margin-bottom: 20px;">Password Reset Request</h2>
        <p style="color: #333333; font-size: 16px; line-height: 1.5;">Hello,</p>
        <p style="color: #333333; font-size: 16px; line-height: 1.5;">You are receiving this email because we received a password reset request for your account. If you did not request a password reset, please ignore this email.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" target="_blank" style="background-color: #407BFF; color: #ffffff; padding: 10px 20px; text-decoration: none; font-weight: bold; border-radius: 5px; display: inline-block; font-size: 16px;">Reset Password</a>
        </div>
        <p style="color: #333333; font-size: 16px; line-height: 1.5;">This link is valid for the next hour.</p>
        <p style="color: #333333; font-size: 16px; line-height: 1.5;">If you are having trouble clicking the link, please copy and paste it into your web browser's address bar.</p>
        <p style="color: #333333; font-size: 16px; margin-top: 30px;">Thank you, ${userName}</p>
        <div style="text-align: center;">
        <a href="${BASE_URL}">
          <img src="https://yanlozovskyi.github.io/water-tracker/assets/Logo-890d13ba.png" alt="Logo" style="max-width: 100px; margin: 0 auto;">
          </a>
        </div>
      </div>
    </div>`,
  });

  res
    .status(200)
    .json({ message: "Password reset link has been sent to your email" });
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const updatedUser = await User.findOneAndUpdate(
    {
      resetToken: token,
      resetTokenExpire: { $gt: Date.now() },
    },
    {
      password: hashedPassword,
      resetToken: undefined,
      resetTokenExpire: undefined,
    },
    { new: true }
  );

  if (!updatedUser) {
    throw HttpError(400, "Invalid or expired token");
  }

  res.status(200).json({ message: "Password has been reset successfully" });
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  requestPasswordReset: ctrlWrapper(requestPasswordReset),
  resetPassword: ctrlWrapper(resetPassword),
};
