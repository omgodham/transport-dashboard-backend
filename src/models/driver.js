const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const driverSchema = new Schema(
	{
		name: String,
		phoneNo: String,
		salary: String,
	},
	{ timestamps: true }
);
module.exports = mongoose.model("Driver", driverSchema);
