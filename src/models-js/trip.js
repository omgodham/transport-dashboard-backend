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
		customerName: String,
		vehicle: { type: mongoose.ObjectId, ref: "Vehicle" },
		vehicleNo: String,
		driver: { type: mongoose.ObjectId, ref: "Driver" },
		pickup: String,
		dropup: String,
		lrNo: String,
		challanNo: String,
		billNo: String,
		advanceToDriver: Number,
		advanceToTransportService: Number,
		fuelCharge: Number,
		extraCharge: Number,
		extraChargeDescription: String,
		advanceForCustomer: Number,
		paymentReceived: Number,
		paymentPending: Number,
		paymentVoucherNumber: String,
		materialWeight: Number,
		truckModel: String,
		paidPaymentCheck: {
			checkNumber: String,
			bankName: String,
		},
		remaingPaymentCheck: {
			checkNumber: String,
			bankName: String,
		},
		totalPayment: Number,
		company: String,
		challanImages: Array,
		agent: String,
		commission: Number,
		driverExtraCharge: Number,
		driverBhatta: Number,
		lrCharges: {
			type: Number,
			default: 100,
		},
		selfTrip: {
			type: Boolean,
			default: false,
		},
		paymentToTransporter: Number,
		billPaid: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Trip", tripSchema);
