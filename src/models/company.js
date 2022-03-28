const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const companySchema = new Schema(
  {
    name: String,
    gstNo: String,
    contactInfo: {
      phoneNo: String,
      email: String,
    },
    address: {
      addressLine1: String,
      state: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Company", companySchema);
