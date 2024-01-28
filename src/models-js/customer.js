const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema(
  {
    name: String,
    ownerName: {
      type: String,
      default: "",
    },
    gstNo: {
      type: String,
      default: "",
    },
    contactInfo: {
      phoneNo: {
        type: String,
        default: "",
      },
      email: {
        type: String,
        default: "",
      },
    },
    address: {
      addressLine1: {
        type: String,
        default: "",
      },
      state: {
        type: String,
        default: "",
      },
    },
    paymentDetails: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);
