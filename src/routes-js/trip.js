const express = require("express");
const {
	saveTripById,
	getTripById,
	createTrip,
	updateTrip,
	getAllTrips,
	getTripByLr,
} = require("../controllers-js/trip");
const app = express();
const router = express.Router();

router.param("trip", saveTripById);

router.get("/get-trip/:trip", getTripById);
router.get("/get-trip-by-lr/:LrNo/", getTripByLr);
router.post("/get-all-trips", getAllTrips);
router.post("/create-trip", createTrip);
router.patch("/update-trip/:trip", updateTrip);

module.exports = router;
