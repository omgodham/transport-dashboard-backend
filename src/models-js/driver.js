const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const driverSchema = new Schema(
  {
    name: String,
    phoneNo: String,
    salary: String,
    trips: [],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Driver", driverSchema);
