const express = require("express");
const {
	saveTripById,
	getTripById,
	createTrip,
	updateTrip,
	getAllTrips,
	getTripByLr,
	getTripByCustomer,
	getTripByDriver,
} = require("../controllers-js/trip");
const app = express();
const router = express.Router();

router.param("trip", saveTripById);

router.get("/get-trip/:trip", getTripById);
router.get("/get-trip-by-lr/:LrNo/", getTripByLr);
router.post("/get-trip-by-customer/:customer/", getTripByCustomer);
router.post("/get-trip-by-driver/:driver/", getTripByDriver);
router.post("/get-all-trips", getAllTrips);
router.post("/create-trip", createTrip);
router.patch("/update-trip/:trip", updateTrip);

module.exports = router;
