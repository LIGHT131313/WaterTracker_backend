import User from "../models/User.js";

import { ctrlWrapper } from "../decorators/index.js";

import { HttpError } from "../helpers/index.js";

const updateWaterRate = async (req, res) => {
  res.json();
};

export default {
  updateWaterRate: ctrlWrapper(updateWaterRate),
};
