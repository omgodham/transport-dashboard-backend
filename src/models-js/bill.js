const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const billSchema = new Schema(
	{
		customer: { type: mongoose.ObjectId, ref: "Customer" },
		company: { type: mongoose.ObjectId, ref: "Company" },
		billNo: String,
		trips: [],
		startDate: Date,
		endDate: Date,
		isPaid: { type: Boolean, default: false },
		billDate: {
			type: Date,
			default: new Date(),
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Bill", billSchema);
