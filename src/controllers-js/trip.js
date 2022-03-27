const Trip = require("../models/trip");

exports.saveTripById = (req, res, next, id) => {
  Trip.findById(id)
    .then((response) => {
      if (response) {
        req.trip = response;
        next();
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
  const trip = new Trip(req.body);
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
