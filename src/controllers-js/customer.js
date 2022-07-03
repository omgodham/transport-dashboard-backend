const Customer = require("../models-js/customer");
const Trip = require("../models-js/trip");

exports.getAllCustomers = (req, res) => {
  Customer.find({})
    .then((response) => {
      if (response) {
        res.status(200).json(response);
      } else return res.status(404).json({ message: "Customer not found" });
    })
    .catch((error) => {
      return res.status(404).json({ message: "Internal Server Error" });
    });
};

exports.saveCustomerById = (req, res, next, id) => {
  Customer.findById(id)
    .then((response) => {
      if (response) {
        req.customer = response;
        next();
      } else return res.status(404).json({ message: "Customer not found" });
    })
    .catch((error) => {
      return res.status(404).json({ message: "Internal Server Error" });
    });
};

exports.getCustomerById = (req, res) => {
  return res.status(200).json(req.customer);
};

exports.createCustomer = (req, res) => {
  const customer = new Customer(req.body.data);
  customer
    .save()
    .then((response) => {
      if (response) return res.status(200).json(response);

      return res.status(404).json({ message: "Customer creation failed" });
    })
    .catch((error) => {
      return res.status(404).json({ message: "Internal Server Error" });
    });
};

exports.updateCustomer = (req, res) => {
  const customer = new Customer(req.body.data);
  Customer.findByIdAndUpdate(
    req.params.customer,
    { $set: req.body.data },
    { new: true, useFindAndModify: false }
  )
    .then((response) => {
      if (response) return res.status(200).json(response);

      return res.status(404).json({ message: "Customer updation failed" });
    })
    .catch((error) => {
      return res.status(404).json({ message: "Internal Server Error" });
    });
};

exports.deleteCustomer = (req, res) => {
  Customer.findByIdAndDelete(req.customer._id)
    .then((response) => {
      if (response) return res.status(200).json(response);
      else return res.status(500).json({ message: "Customer deletion failed" });
    })
    .catch((error) => {
      return res.status(500).json({ message: "Internal Server Error" });
    });
};
exports.getTotalPaymentOfTheMonthOfCustomer = async (req, res) => {
  let trips = await ({
    customer: req.body.customer,
  },
  { challanImages: 0 }).exec();
  let total = 0;
  let advance = 0;
  let remaining = 0;
  let flag = false;
  for (const trip of trips) {
    if (JSON.stringify(trip.tripDate).includes(req.body.month)) {
      flag = true;
      total += trip.totalPayment
        ? trip.totalPayment
        : 0 + trip.extraCharges
        ? trip.extraCharges
        : 0;
      advance += trip.advanceToDriver
        ? trip.advanceToDriver
        : 0 + trip.paymentReceived
        ? trip.paymentReceived
        : 0;
      remaining += trip.paymentPending ? trip.paymentPending : 0;
    }
  }
  if (flag) {
    return res
      .status(200)
      .json({ total: total, advance: advance, remaining: remaining });
  } else {
    return res.status(500).json({ message: "No data found for this month" });
  }
};
