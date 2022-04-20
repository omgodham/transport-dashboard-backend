const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const extraChargeSchema = new Schema(
  {
    type: String,
    amount: Number,
    description: String,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Extracharge", extraChargeSchema);
