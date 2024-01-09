import { Schema, model } from "mongoose";

import { handleSaveError, preUpdate } from "./hooks.js";

import { dateRegexp } from "../utils/validation/waterValidationSchemas.js";

const waterSchema = new Schema(
  {
    waterVolume: {
      type: Number,
      min: 1,
      max: 5000,
      required: [true, "Set water volume"],
    },
    date: {
      type: Date,
      required: true,
      match: dateRegexp,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false }
);

waterSchema.post("save", handleSaveError);

waterSchema.pre("findOneAndUpdate", preUpdate);

waterSchema.post("findOneAndUpdate", handleSaveError);

const WaterValue = model("waterValue", waterSchema);

export default WaterValue;
