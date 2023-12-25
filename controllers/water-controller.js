import WaterValue from "../models/WaterValue.js";

import { ctrlWrapper } from "../decorators/index.js";

import { HttpError } from "../helpers/index.js";

const addWaterValue = async (req, res) => {
  const { _id: owner } = req.user;
  const { date } = req.body;

  const waterDate = await WaterValue.findOne({ date, owner });
  if (waterDate) {
    throw HttpError(
      409,
      `WaterVolume with this date ${date} already exists in DB`
    );
  }
  const result = await WaterValue.create({ ...req.body, owner });

  res.status(201).json(result);
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
