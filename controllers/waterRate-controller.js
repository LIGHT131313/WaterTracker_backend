import User from "../models/User.js";

import { ctrlWrapper } from "../decorators/index.js";

import { HttpError } from "../helpers/index.js";

const updateWaterRate = async (req, res) => {
  const { waterRate } = req.body;
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { waterRate: waterRate });

  res.status(201).json({
    message: "WaterRate updated succesfully",
  });
};

export default {
  updateWaterRate: ctrlWrapper(updateWaterRate),
};
