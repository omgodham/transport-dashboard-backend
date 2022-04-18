const Vehicle = require("../models/vehicle");

exports.saveVehicleById = (req, res, next, id) => {
  Vehicle.findById(id)
    .then((response) => {
      if (response) {
        req.vehicle = response;
        next();
        return "";
      }
      return res.status(404).json({ message: "Vehicle not found" });
    })
    .catch((error) => {
      return res.status(404).json({ message: "Internal Server Error" });
    });
};

exports.getVehicleById = (req, res) => {
  return res.status(200).json(req.vehicle);
};

exports.createVehicle = (req, res) => {
  const vehicle = new Vehicle(req.body);
  vehicle
    .save()
    .then((response) => {
      if (response) return res.status(200).json(response);

      return res.status(404).json({ message: "Vehicle creation failed" });
    })
    .catch((error) => {
      return res.status(404).json({ message: "Internal Server Error" });
    });
};

exports.updateVehicle = (req, res) => {
  Vehicle.findByIdAndUpdate(
    req.vehicle._id,
    { $set: req.body },
    { new: true, useFindAndModify: false }
  )
    .then((response) => {
      if (response) return res.status(200).json(response);

      return res.status(404).json({ message: "Vehicle updation failed" });
    })
    .catch((error) => {
      return res.status(404).json({ message: "Internal Server Error" });
    });
};
