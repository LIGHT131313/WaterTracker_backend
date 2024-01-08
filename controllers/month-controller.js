import User from "../models/User.js";
import WaterValue from "../models/WaterValue.js";

import { ctrlWrapper } from "../decorators/index.js";

import { HttpError } from "../helpers/index.js";

const getMonthlyStatistic = async (req, res) => {
  const { _id: owner } = req.user;
  const { startDate, endDate } = req.query;
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
              $gte: new Date(startDate),

              $lte: new Date(new Date(endDate).getTime() + 24 * 60 * 60 * 1000),
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

  res.json(result);
};

export default {
  getMonthlyStatistic: ctrlWrapper(getMonthlyStatistic),
};
