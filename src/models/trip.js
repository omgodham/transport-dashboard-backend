const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const tripSchema = new Schema(
  {
    srNo: Number,
    tripDate: {
      type: Date,
      default: new Date(),
    },
    companyName: String,
    companyNumber: String,
    vehicleNumber: String,
    driveName: String,
    driveNumber: String,
    locationFrom: String,
    locationTo: String,
    lrNo: String,
    challanNo: String,
    billNo: String,
    advanceToDriver: Number,
    advanceToTransportService: Number,
    fuelCharge: Number,
    advanceGivenByCompany: Number,
    paymentReceived: Number,
    paymentLeft: Number,
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
