import User from "../models/User.js";
import WaterValue from "../models/WaterValue.js";

import { ctrlWrapper } from "../decorators/index.js";

import { HttpError } from "../helpers/index.js";

const getDayliStatistic = async (req, res) => {
  const { _id: owner } = req.user;
  const { date } = req.query;
  const { waterRate } = await User.findById(owner);

  if (!waterRate) {
    throw HttpError(400, "Water rate not provided");
  }

  const result = await WaterValue.aggregate([
    {
      $match: {
        $and: [
          { owner: owner },
          {
            date: {
              $gte: new Date(date),
              $lte: new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000),
            },
          },
        ],
      },
    },
    {
      $group: {
        _id: null,
        waterVolumeSum: { $sum: "$waterVolume" },
        waterVolumes: { $push: "$$ROOT" },
      },
    },
    {
      $addFields: {
        waterVolumePercentage: {
          $min: [
            { $multiply: [{ $divide: ["$waterVolumeSum", waterRate] }, 100] },
            100,
          ],
        },
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
  ]);

  res.json(result);
};

export default {
  getDayliStatistic: ctrlWrapper(getDayliStatistic),
};
