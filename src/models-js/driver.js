const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const driverSchema = new Schema(
	{
		name: String,
		phoneNo: String,
		salary: String,
		aadhar: String,
		aadharCard: { data: Buffer, contentType: String },
	},
	{ timestamps: true }
);
module.exports = mongoose.model("Driver", driverSchema);
