const Trip = require("../models-js/trip");
const Driver = require("../models-js/driver");
exports.getAllTrips = (req, res) => {
  //   let todayStart = req.body.startDate;
  //   let todayEnd = req.body.endDate;

  const todayStart = new Date(
    new Date(req.body.startDate).setHours(0, 0, 0, 0)
  );
  const todayEnd = new Date(
    new Date(req.body.endDate).setHours(23, 59, 59, 999)
  );
  Trip.find({
    createdAt: {
      $gte: todayStart,
      $lt: todayEnd,
    },
  })
    .then((response) => {
      if (response) {
        return res.status(200).json(response);
      } else return res.status(500).json({ message: "Trip not found" });
    })
    .catch((error) => {
      return res.status(404).json({ message: "Internal Server Error" });
    });
};

exports.searchTrip = (req, res) => {
  Trip.find({
    $or: [
      { billNo: req.params.query },
      { paymentVoucherNumber: req.params.query },
      { lrNo: req.params.query },
    ],
  })
    .then((response) => {
      if (response) {
        return res.status(200).json(response);
      } else return res.status(500).json({ message: "Trip not found" });
    })
    .catch((error) => {
      return res.status(404).json({ message: "Internal Server Error" });
    });
};

exports.getTripByCustomer = (req, res) => {
  const todayStart = new Date(
    new Date(req.body.startDate).setHours(0, 0, 0, 0)
  );
  const todayEnd = new Date(
    new Date(req.body.endDate).setHours(23, 59, 59, 999)
  );

  Trip.find({
    customer: req.params.customer,
    company: req.body.company,
    tripDate: {
      $gte: todayStart,
      $lt: todayEnd,
    },
  })
    .then((response) => {
      if (response) {
        return res.status(200).json(response);
      } else return res.status(500).json({ message: "Trip not found" });
    })
    .catch((error) => {
      return res.status(404).json({ message: "Internal Server Error" });
    });
};

exports.getTripByDriver = (req, res) => {
  const todayStart = new Date(
    new Date(req.body.startDate).setHours(0, 0, 0, 0)
  );
  const todayEnd = new Date(
    new Date(req.body.endDate).setHours(23, 59, 59, 999)
  );

  Trip.find({
    driver: req.params.driver,
    createdAt: {
      $gte: todayStart,
      $lt: todayEnd,
    },
  })
    .then((response) => {
      if (response) {
        return res.status(200).json(response);
      } else return res.status(500).json({ message: "Trip not found" });
    })
    .catch((error) => {
      return res.status(404).json({ message: "Internal Server Error" });
    });
};

exports.saveTripById = (req, res, next, id) => {
  Trip.findById(id)
    .then((response) => {
      if (response) {
        req.trip = response;
        next();
      } else return res.status(404).json({ message: "Trip not found" });
    })
    .catch((error) => {
      return res.status(404).json({ message: "Internal Server Error" });
    });
};

exports.getTripById = (req, res) => {
  return res.status(200).json(req.trip);
};

exports.createTrip = async (req, res) => {
  const trip = new Trip(req.body.data);

  let number;

  let temp = await Trip.findOne({ selfTrip: trip.selfTrip })
    .sort({ _id: -1 })
    .limit(1)
    .exec();

  if (trip.selfTrip) {
    number = temp ? parseInt(temp.billNo ? temp.billNo : "0000") + 1 : "0001";
  } else {
    number = temp
      ? parseInt(
          temp.paymentVoucherNumber ? temp.paymentVoucherNumber : "0000"
        ) + 1
      : "0001";
  }

  if (trip.selfTrip) {
    trip.billNo = number;
  } else {
    trip.paymentVoucherNumber = number;
  }
  console.log(trip);
  trip
    .save()
    .then((response) => {
      Driver.findOneAndUpdate(
        { _id: req.body.data.driver },
        {
          $push: { trips: response._id },
        },
        { new: true, useFindAndModify: false }
      ).exec();

      if (response) return res.status(200).json(response);

      return res.status(404).json({ message: "Trip creation failed" });
    })
    .catch((error) => {
      console.log(error);
      return res.status(404).json({ message: "Internal Server Error" });
    });
};

exports.updateTrip = (req, res) => {
  console.log(req.body.data);
  Trip.findByIdAndUpdate(
    req.params.trip,
    { $set: req.body.data },
    { new: true, useFindAndModify: false }
  )
    .then((response) => {
      if (response) return res.status(200).json(response);

      return res.status(404).json({ message: "Trip updation failed" });
    })
    .catch((error) => {
      console.log(error);
      return res.status(404).json({ message: "Internal Server Error" });
    });
};

exports.getPaymentOfTheMonth = (req, res) => {
  const todayStart = new Date(
    new Date(req.body.startDate).setHours(0, 0, 0, 0)
  );
  const todayEnd = new Date(
    new Date(req.body.endDate).setHours(23, 59, 59, 999)
  );

  Trip.find({
    customer: req.params.customer,
    company: req.body.company,
    tripDate: {
      $gte: todayStart,
      $lt: todayEnd,
    },
  })
    .then((response) => {
      if (response) {
      } else return res.status(500).json({ message: "Trip not found" });
    })
    .catch((error) => {
      return res.status(404).json({ message: "Internal Server Error" });
    });
};

exports.deleteTrip = (req, res) => {
  Trip.deleteOne({ _id: req.params.tripId })
    .then((response) => {
      if (response) return res.status(200).json(response);

      return res.status(404).json({ message: "Trip deletion failed" });
    })
    .catch((error) => {
      return res.status(404).json({ message: "Internal Server Error" });
    });
};
