import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import bcrypt from "bcryptjs";

import User from "../models/User.js";

import { sendEmail, welcomeEmailTemplate } from "../helpers/index.js";

const { JWT_SECRET, BASE_URL } = process.env;
const googleAuthHelper = async (data) => {
  const { email, given_name, picture } = data;

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    const verificationToken = nanoid();
    const hashPass = await bcrypt.hash(nanoid(), 10);
    const newUser = await User.create({
      email,
      password: hashPass,
      name: given_name,
      avatar: picture,
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

    return token;
  } else {
    const payload = {
      id: existingUser._id,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
    await User.findByIdAndUpdate(existingUser._id, { token });

    return token;
  }
};

export default googleAuthHelper;
