import User from "../models/User.js";
import WaterValue from "../models/WaterValue.js";

import { ctrlWrapper } from "../decorators/index.js";

import { HttpError } from "../helpers/index.js";

const getMonthlyStatistic = async (req, res) => {
  const { _id: owner } = req.user;
  const { startDate, endDate } = req.query; // - для періоду
  // const { year, month } = req.query; - для конкретного місяця
  const { waterRate } = await User.findById(owner);

  // const startDate = new Date(year, month - 1, 1); - для конкретного місяця
  // const endDate = new Date(year, month, 0); - для конкретного місяця

  if (!waterRate) {
    throw HttpError(500, "Internal Server Error");
  }

  const result = await WaterValue.aggregate([
    {
      $match: {
        $and: [
          { owner: owner },
          {
            date: {
              $gte: new Date(startDate),
              // $gte: startDate, - для конкретного місяця
              $lte: new Date(new Date(endDate).getTime() + 24 * 60 * 60 * 1000),
              // $lte: endDate, - для конкретного місяця
            },
          },
        ],
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
        waterVolumeSum: { $sum: "$waterVolume" },
        drinkCount: { $sum: 1 },
      },
    },
    {
      $project: {
        date: "$_id",
        _id: 0,
        waterVolumeSum: 1,
        drinkCount: 1,
        waterVolumePercentage: {
          $min: [
            { $multiply: [{ $divide: ["$waterVolumeSum", waterRate] }, 100] },
            100,
          ],
        },
      },
    },
  ]);

  if (result.length === 0) {
    throw HttpError(
      404,
      `Data for this period: ${startDate} - ${endDate} not found`
    );
  }

  res.json(result);
};

export default {
  getMonthlyStatistic: ctrlWrapper(getMonthlyStatistic),
};
