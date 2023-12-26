import WaterValue from "../models/WaterValue.js";

import { ctrlWrapper } from "../decorators/index.js";

import { HttpError } from "../helpers/index.js";

const getWaterValueByID = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const result = await WaterValue.findOne({ _id: id, owner });

  res.json(result);
};
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
  const { id } = req.params;
  const { _id: owner } = req.user;
  const { waterVolume, date } = req.body;

  const existingRecord = await WaterValue.findOne({ _id: id, owner });
  if (!existingRecord) {
    throw HttpError(404, "WaterVolume not found");
  }

  if (date && date !== existingRecord.date) {
    const newWaterDate = await WaterValue.findOne({ date, owner });
    if (newWaterDate) {
      throw HttpError(
        409,
        `WaterVolume with this date ${date} already exists in DB`
      );
    }
  }

  if (waterVolume && waterVolume !== existingRecord.waterVolume) {
    const newWaterVolume = await WaterValue.findOne({ waterVolume, owner });
    if (newWaterVolume) {
      throw HttpError(
        409,
        `WaterVolume with this Volume ${waterVolume} already exists in DB`
      );
    }
  }

  const result = await WaterValue.findOneAndUpdate(
    { _id: id, owner },
    { waterVolume, date },
    { new: true }
  );

  res.json(result);
};
const deleteteWaterValueByID = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const result = await WaterValue.findOneAndDelete({ _id: id, owner });
  if (!result) {
    throw HttpError(404, `Water Volume with id=${id} not found`);
  }
  res.json({ message: "Water Volume deleted" });
};

export default {
  addWaterValue: ctrlWrapper(addWaterValue),
  updateWaterValueByID: ctrlWrapper(updateWaterValueByID),
  deleteteWaterValueByID: ctrlWrapper(deleteteWaterValueByID),
  getWaterValueByID: ctrlWrapper(getWaterValueByID),
};
