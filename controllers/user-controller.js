import bcrypt from "bcryptjs";

import fs from "fs/promises";

import User from "../models/User.js";

import WaterValue from "../models/WaterValue.js";

import { ctrlWrapper } from "../decorators/index.js";
import { HttpError, cloudinary } from "../helpers/index.js";

import { deleteFromCloudinary } from "../helpers/cloudinary.js";

const getCurrent = async (req, res) => {
  const { name = "", email, gender, avatarURL, waterRate } = req.user;
  res.json({ name, email, gender, avatarURL, waterRate });
};

const updateUserInfo = async (req, res) => {
  const { outdatedPassword, newPassword, newEmail } = req.body;
  const { _id, currentEmail } = req.user;

  let hashedNewPassword;

  if (outdatedPassword && newPassword) {
    const user = await User.findById(_id);
    if (!user) {
      throw HttpError(404, "User not found");
    }

    const { password } = user;

    if (outdatedPassword === newPassword) {
      throw HttpError(
        400,
        "The new password must be different from the old one"
      );
    }

    const comparedPassword = await bcrypt.compare(outdatedPassword, password);

    if (!comparedPassword) {
      throw HttpError(401, "Current password is incorrect");
    }

    hashedNewPassword = await bcrypt.hash(newPassword, 10);
  } else if (newPassword) {
    throw HttpError(
      400,
      "To change the password, provide both outdatedPassword and newPassword"
    );
  }

  if (newEmail && newEmail !== currentEmail) {
    const userWithNewEmail = await User.findOne({ email: newEmail });

    if (userWithNewEmail) {
      throw HttpError(409, "Email is already in use");
    }
  }

  const updatedUserData = { ...req.body };
  if (hashedNewPassword) {
    updatedUserData.password = hashedNewPassword;
  }

  const updatedUser = await User.findByIdAndUpdate(_id, updatedUserData, {
    new: true,
  });

  const { name = "", gender, email } = updatedUser;
  res.status(200).json({ email, name, gender });
};

const avatar = async (req, res) => {
  const { _id } = req.user;
  if (!req.file) {
    throw HttpError(400, "File not found");
  }
  const { path } = req.file;
  const { url: avatarURL } = await cloudinary.uploader.upload(req.file.path, {
    folder: "user_avatars",
    width: 250,
    height: 250,
    crop: "pad",
  });
  await fs.unlink(path);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({
    avatarURL,
  });
};

const deleteUserAndData = async (req, res) => {
  const { _id } = req.user;

  const user = await User.findById(_id);
  if (!user) {
    throw new HttpError(404, "User not found");
  }

  await WaterValue.deleteMany({ owner: _id });

  if (user.avatarURL) {
    await deleteFromCloudinary(user.avatarURL);
  }

  await User.findByIdAndDelete(_id);

  res.status(200).json({
    message: "User and all related data have been successfully deleted.",
  });
};

export default {
  avatar: ctrlWrapper(avatar),
  getCurrent: ctrlWrapper(getCurrent),
  updateUserInfo: ctrlWrapper(updateUserInfo),
  deleteUserAndData: ctrlWrapper(deleteUserAndData),
};
