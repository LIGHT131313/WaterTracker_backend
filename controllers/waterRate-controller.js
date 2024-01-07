import User from "../models/User.js";

import { ctrlWrapper } from "../decorators/index.js";

const updateWaterRate = async (req, res) => {
  const { waterRate } = req.body;
  const { _id } = req.user;

  const updatedWaterRate = await User.findByIdAndUpdate(_id, {
    waterRate: waterRate,
  });

  res.status(201).json({ waterRate: updatedWaterRate.waterRate });
};

export default {
  updateWaterRate: ctrlWrapper(updateWaterRate),
};
