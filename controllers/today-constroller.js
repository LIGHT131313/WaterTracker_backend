import User from "../models/User.js";
import WaterValue from "../models/WaterValue.js";

import { ctrlWrapper } from "../decorators/index.js";

import { HttpError } from "../helpers/index.js";

const getDayliStatistic = async (req, res) => {
  res.json();
};

export default {
  getDayliStatistic: ctrlWrapper(getDayliStatistic),
};
