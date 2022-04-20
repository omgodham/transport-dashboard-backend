const Vehicle = require("../models-js/vehicle");

exports.getAllVehicles = (req, res) => {
  Vehicle.find({})
    .then((response) => {
      if (response) {
        return res.status(200).json(response);
      } else return res.status(500).json({ message: "Vehicle not found" });
    })
    .catch((error) => {
      return res.status(404).json({ message: "Internal Server Error" });
    });
};

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
  const vehicle = new Vehicle(req.body.data);
  vehicle
    .save()
    .then((response) => {
      if (response) return res.status(200).json(response);
      else return res.status(404).json({ message: "Vehicle creation failed" });
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

exports.deleteVehicle = (req, res) => {
  Vehicle.findByIdAndDelete(req.body.vehicleId)
    .then((response) => {
      if (response) return res.status(200).json(response);
      else return res.status(500).json({ message: "Vehicle deletion failed" });
    })
    .catch((error) => {
      return res.status(500).json({ message: "Internal Server Error" });
    });
};
