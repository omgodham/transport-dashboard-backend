const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const driverSchema = new Schema(
	{
		name: String,
		phoneNo: String,
		salary: String,
		aadhar: String,
		trips: [],
		aadharCard: { data: Buffer, contentType: String },
		license: { data: Buffer, contentType: String },
		chargePerTrip: String,
		salaryDetails: [], //[{month,advance,remaining,currentSalary}]
	},
	{ timestamps: true }
);
module.exports = mongoose.model("Driver", driverSchema);
