import fs from "fs/promises";

import Contact from "../models/Contact.js";

import { ctrlWrapper } from "../decorators/index.js";
import { HttpError, cloudinary } from "../helpers/index.js";

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, ...filterParams } = req.query;
  const skip = (page - 1) * limit;
  const filter = { owner, ...filterParams };

  const result = await Contact.find(filter, null, { skip, limit }).populate(
    "owner",
    "email"
  );
  const total = await Contact.countDocuments(filter);

  res.json({ result, total: total });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const result = await Contact.findById({ _id: id, owner });
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.json(result);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const { url: avatarURL } = await cloudinary.uploader.upload(req.file.path, {
    folder: "contact_avatars",
    width: 250,
    height: 250,
    crop: "pad",
  });
  await fs.unlink(req.file.path);

  const result = await Contact.create({ ...req.body, avatarURL, owner });

  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const result = await Contact.findOneAndUpdate({ _id: id, owner }, req.body);
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const result = await Contact.findOneAndDelete({ _id: id, owner });
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.json({ message: "Contact deleted" });
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
