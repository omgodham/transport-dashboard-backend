const express = require("express");
const {
  saveVehicleById,
  getVehicleById,
  createVehicle,
  updateVehicle,
  getAllVehicles,
  deleteVehicle,
} = require("../controllers-js/vehicle");
const app = express();
const router = express.Router();

router.param("vehicle", saveVehicleById);

router.get("/get-vehicle/:vehicle", getVehicleById);
router.get("/get-all-vehicles", getAllVehicles);
router.post("/create-vehicle", createVehicle);
router.delete("/delete-vehicle/:vehicle", deleteVehicle);
router.patch("/update-vehicle/:vehicle", updateVehicle);

module.exports = router;
