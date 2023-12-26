import User from "../models/User.js";
import WaterValue from "../models/WaterValue.js";

import { ctrlWrapper } from "../decorators/index.js";

import { HttpError } from "../helpers/index.js";

const getMonthlyStatistic = async (req, res) => {
  const { _id: owner } = req.user;
  const { date } = req.body;
  const { waterRate } = await User.findById(owner);
  // console.log(waterRate);

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
        waterVolumesSum: { $sum: 1 },
        waterVolumesNumber: { $sum: "$waterVolume" },
        waterVolumes: { $push: "$$ROOT" },
      },
    },
    {
      $addFields: {
        percentage: {
          $multiply: [{ $divide: ["$waterVolumesNumber", waterRate] }, 100],
        },
      },
    },
  ]);

  res.json(result);
};

export default {
  getMonthlyStatistic: ctrlWrapper(getMonthlyStatistic),
};
