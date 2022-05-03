const Trip = require("../models-js/trip");
const Driver = require("../models-js/driver");
exports.getAllTrips = (req, res) => {
  console.log(req.body.startDate);
  Trip.find({
    createdAt: {
      $gte: req.body.startDate,
      $lt: req.body.endDate,
    },
  })
    .then((response) => {
      if (response) {
        return res.status(200).json(response);
      } else return res.status(500).json({ message: "Trip not found" });
    })
    .catch((error) => {
      console.log(error);
      return res.status(404).json({ message: "Internal Server Error" });
    });
};

exports.getTripByLr = (req, res) => {
  Trip.find({ lrNo: req.params.LrNo })
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

exports.createTrip = (req, res) => {
  const trip = new Trip(req.body.data);
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
      return res.status(404).json({ message: "Internal Server Error" });
    });
};

exports.updateTrip = (req, res) => {
  Trip.findByIdAndUpdate(
    req.params.trip,
    { $set: req.body.data },
    { new: true, useFindAndModify: false }
  )
    .then((response) => {
      console.log(req.params.trip);
      if (response) return res.status(200).json(response);

      return res.status(404).json({ message: "Trip updation failed" });
    })
    .catch((error) => {
      return res.status(404).json({ message: "Internal Server Error" });
    });
};
