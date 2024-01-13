import WaterValue from "../models/WaterValue.js";

import { ctrlWrapper } from "../decorators/index.js";

import { HttpError, putZeroSec } from "../helpers/index.js";

const getWaterValueByID = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const result = await WaterValue.findOne({ _id: id, owner });

  res.json(result);
};
const addWaterValue = async (req, res) => {
  const { _id: owner } = req.user;
  const { waterVolume, date } = req.body;

  const formattedDate = putZeroSec(date);

  const waterDate = await WaterValue.findOne({ date: formattedDate, owner });
  if (waterDate) {
    throw HttpError(
      409,
      `WaterVolume with this date ${formattedDate} already exists in DB`
    );
  }
  const result = await WaterValue.create({
    waterVolume,
    date: formattedDate,
    owner,
  });

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

  let formattedDate = null;
  if (date) {
    formattedDate = putZeroSec(date);

    const dateConflict = await WaterValue.findOne({
      date: formattedDate,
      owner,
      _id: { $ne: id },
    });
    if (dateConflict) {
      throw HttpError(
        409,
        `WaterVolume with this date ${formattedDate} already exists in DB`
      );
    }
  }

  const result = await WaterValue.findOneAndUpdate(
    { _id: id, owner },
    { waterVolume, date: formattedDate || existingRecord.date },
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
