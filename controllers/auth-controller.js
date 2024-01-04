import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";

import User from "../models/User.js";

import { ctrlWrapper } from "../decorators/index.js";
import {
  HttpError,
  sendEmail,
  welcomeEmailTemplate,
  resetPasswordEmail,
} from "../helpers/index.js";

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

  await sendEmail({
    to: email,
    subject: "Welcome to WaterTracker – Start Your Hydration Journey!",
    html: welcomeEmailTemplate(BASE_URL),
  });

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

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

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

  const userName = updatedUser.name ? updatedUser.name : "User";

  const resetLink = `${BASE_URL}/api/auth/reset-pass?resetToken=${resetToken}`;

  await sendEmail({
    to: email,
    subject: "Password Reset",
    html: resetPasswordEmail(BASE_URL, resetLink, userName),
  });

  res
    .status(200)
    .json({ message: "Password reset link has been sent to your email" });
};

const resetPassword = async (req, res) => {
  const { resetToken, newPassword } = req.body;
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const updatedUser = await User.findOneAndUpdate(
    {
      resetToken,
      resetTokenExpire: { $gt: Date.now() },
    },
    {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpire: null,
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
