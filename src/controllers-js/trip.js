const Trip = require("../models-js/trip");

exports.getAllTrips = (req, res) => {
  Trip.find({})
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
        return "";
      }
      return res.status(404).json({ message: "Trip not found" });
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
      if (response) return res.status(200).json(response);

      return res.status(404).json({ message: "Trip creation failed" });
    })
    .catch((error) => {
      return res.status(404).json({ message: "Internal Server Error" });
    });
};

exports.updateTrip = (req, res) => {
  Trip.findByIdAndUpdate(
    req.trip._id,
    { $set: req.body },
    { new: true, useFindAndModify: false }
  )
    .then((response) => {
      if (response) return res.status(200).json(response);

      return res.status(404).json({ message: "Trip updation failed" });
    })
    .catch((error) => {
      return res.status(404).json({ message: "Internal Server Error" });
    });
};
