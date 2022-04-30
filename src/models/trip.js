const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const tripSchema = new Schema(
	{
		srNo: Number,
		tripDate: {
			type: Date,
			default: new Date(),
		},
		customer: { type: mongoose.ObjectId, ref: "Customer" },
		vehicle: { type: mongoose.ObjectId, ref: "Vehicle" },
		driver: { type: mongoose.ObjectId, ref: "Driver" },
		pickup: String,
		dropup: String,
		lrNo: String,
		challanNo: String,
		billNo: String,
		advanceToDriver: Number,
		advanceToTransportService: Number,
		fuelCharge: Number,
		advanceGivenByCompany: Number,
		paymentReceived: Number,
		totalPayment: Number,
		paymentVoucherNumber: Number,
		materialWeight: Number,
		trackModel: String,
		paidPaymentCheck: {
			checkNumber: String,
			bankName: String,
		},
		remaingPaymentCheck: {
			checkNumber: String,
			bankName: String,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Trip", tripSchema);