import User from "../models/User.js";
import WaterValue from "../models/WaterValue.js";

import { ctrlWrapper } from "../decorators/index.js";

import { HttpError } from "../helpers/index.js";

const getMonthlyStatistic = async (req, res) => {
  res.json();
};

export default {
  getMonthlyStatistic: ctrlWrapper(getMonthlyStatistic),
};
