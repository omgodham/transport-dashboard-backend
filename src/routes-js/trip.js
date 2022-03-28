const express = require("express");
const {
  saveTripById,
  getTripById,
  createTrip,
  updateTrip,
} = require("../controllers-js/trip");
const app = express();
const router = express.Router();

router.param("trip", saveTripById);

router.get("/get-trip/:trip", getTripById);
router.post("/create-trip", createTrip);
router.patch("/update-trip/:trip", updateTrip);

module.exports = router;
