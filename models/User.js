import { Schema, model } from "mongoose";

import { handleSaveError, preUpdate } from "./hooks.js";
import {
  emailRegexp,
  gender,
} from "../utils/validation/userValidationSchemas.js";

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minLength: 8,
      maxLength: 64,
      required: [true, "Set password for user"],
    },
    gender: {
      type: String,
      enum: gender,
      default: "female",
    },
    avatarURL: {
      type: String,
      default: null,
    },
    waterRate: {
      type: Number,
      default: 2000,
      min: 0,
      max: 15000,
      required: true,
    },
    token: {
      type: String,
    },
    resetToken: {
      type: String,
      default: null,
    },
    resetTokenExpire: {
      type: Date,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveError);

userSchema.pre("findOneAndUpdate", preUpdate);

userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

export default User;
