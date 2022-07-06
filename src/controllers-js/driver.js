const Driver = require("../models-js/driver");
const Trip = require("../models-js/trip");

exports.getAllDrivers = (req, res) => {
  Driver.find({})
    .then((response) => {
      if (response) {
        res.status(200).json(response);
      } else return res.status(404).json({ message: "Driver not found" });
    })
    .catch((error) => {
      return res.status(404).json({ message: "Internal Server Error" });
    });
};

exports.saveDriverById = (req, res, next, id) => {
  Driver.findById(id)
    .then((response) => {
      if (response) {
        req.driver = response;
        next();
      } else return res.status(404).json({ message: "Driver not found" });
    })
    .catch((error) => {
      return res.status(404).json({ message: "Internal Server Error" });
    });
};

exports.getDriverById = (req, res) => {
  return res.status(200).json(req.driver);
};

exports.createDriver = (req, res) => {
  const driver = new Driver(req.body.data);

  driver
    .save()
    .then((response) => {
      if (response) return res.status(200).json(response);

      return res.status(404).json({ message: "Driver creation failed" });
    })
    .catch((error) => {
      return res.status(404).json({ message: "Internal Server Error" });
    });
};

exports.updateDriver = (req, res) => {
  Driver.findByIdAndUpdate(
    req.params.driver,
    { $set: req.body.data },
    { new: true, useFindAndModify: false }
  )
    .then((response) => {
      if (response) return res.status(200).json(response);

      return res.status(404).json({ message: "Driver updation failed" });
    })
    .catch((error) => {
      return res.status(404).json({ message: "Internal Server Error" });
    });
};

exports.deleteDriver = (req, res) => {
  Driver.findByIdAndDelete(req.driver._id)
    .then((response) => {
      if (response) return res.status(200).json(response);
      else return res.status(500).json({ message: "Driver deletion failed" });
    })
    .catch((error) => {
      return res.status(500).json({ message: "Internal Server Error" });
    });
};

exports.getSalaryDetailsOfTheDriver = async (req, res) => {
  let trips = await Trip.find(
    {
      driver: req.driver._id,
    },
    { challanImages: 0 }
  ).exec();
  let advance = 0;
  let remaining = 0;
  let report = [];
  let flag = false;
  for (const trip of trips) {
    if (JSON.stringify(trip.tripDate).includes(req.body.month)) {
      flag = true;
      advance += trip.advanceToDriver ? parseInt(trip.advanceToDriver) : 0;
      remaining += req.driver.salary
        ? parseInt(req.driver.salary) - advance
        : 0;
      report.push({
        advanceGivenDate: trip.tripDate,
        advanceGiven: trip.advanceToDriver ? trip.advanceToDriver : 0,
        bhattaGiven: trip.driverBhatta ? trip.driverBhatta : 0,
      });
    }
  }
  if (flag) {
    return res.status(200).json({
      advance: advance,
      remaining: remaining,
      report: report,
      found: true,
    });
  } else {
    return res.status(500).json({ message: "No data found for this month" });
  }
};
