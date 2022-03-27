const express = require("express");
const {
  saveTripById,
  getTripById,
  createTrip,
} = require("../controllers-js/trip");
const app = express();
const router = express.Router();

router.param("trip", saveTripById);

router.get("/get-trip/:trip", getTripById);
router.post("/create-trip", createTrip);

module.exports = router;
