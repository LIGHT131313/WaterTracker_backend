import WaterValue from "../models/WaterValue.js";

import { ctrlWrapper } from "../decorators/index.js";

import { HttpError } from "../helpers/index.js";

const addWaterValue = async (req, res) => {
  res.json();
};
const updateWaterValueByID = async (req, res) => {
  res.json();
};
const deleteteWaterValueByID = async (req, res) => {
  res.json();
};

export default {
  addWaterValue: ctrlWrapper(addWaterValue),
  updateWaterValueByID: ctrlWrapper(updateWaterValueByID),
  deleteteWaterValueByID: ctrlWrapper(deleteteWaterValueByID),
};
