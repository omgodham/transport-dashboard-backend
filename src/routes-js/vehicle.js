const express = require("express");
const {
  saveVehicleById,
  getVehicleById,
  createVehicle,
  updateVehicle,
} = require("../controllers-js/vehicle");
const app = express();
const router = express.Router();

router.param("vehicle", saveVehicleById);

router.get("/get-vehicle/:vehicle", getVehicleById);
router.post("/create-vehicle", createVehicle);
router.patch("/update-vehicle/:vehicle", updateVehicle);

module.exports = router;
