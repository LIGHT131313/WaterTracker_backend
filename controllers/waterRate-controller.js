import User from "../models/User.js";

import { ctrlWrapper } from "../decorators/index.js";

import { HttpError } from "../helpers/index.js";

const addWaterRate = async (req, res) => {
  res.json();
};

const updateWaterRate = async (req, res) => {
  res.json();
};

const deleteWaterRate = async (req, res) => {
  res.json();
};

export default {
  addWaterRate: ctrlWrapper(addWaterRate),
  updateWaterRate: ctrlWrapper(updateWaterRate),
  deleteWaterRate: ctrlWrapper(deleteWaterRate),
};
