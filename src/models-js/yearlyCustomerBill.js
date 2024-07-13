const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const yearlyCustomerBillSchema = new Schema(
	{
		customer: { type: mongoose.ObjectId, ref: "Customer" },
		company: { type: mongoose.ObjectId, ref: "Company" },
		billNo: String,
		monthlyBills: [{
            billId:{type: mongoose.ObjectId, ref: "Bill"} ,
            billNo:String,
            billDate:Date,
            totalSumOfTrips:Number,
            isPaid:Boolean,
         }],
		startDate: Date,
		endDate: Date,
		billDate: {
			type: Date,
			default: new Date(),
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("YearlyCustomerBill", yearlyCustomerBillSchema);
