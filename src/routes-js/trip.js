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
	getPaymentOfTheMonth,
	getTotalPaymentOfTheMonthOfCustomer,
	deleteTrip,
	getTripByBillNo,
	getTripByVoucherNo,
	searchTrip,
	getTripsFromTheChallan,
	getTripsByIds,
} = require("../controllers-js/trip");
const app = express();
const router = express.Router();

router.param("trip", saveTripById);

router.get("/get-trip/:trip", getTripById);
router.get("/search-trip/:query/", searchTrip);
router.post("/get-trip-by-customer/:customer/", getTripByCustomer);
router.post("/get-trip-by-driver/:driver/", getTripByDriver);
router.post("/get-all-trips", getAllTrips);
router.post("/create-trip", createTrip);
router.patch("/update-trip/:trip", updateTrip);
router.post("/get-payment-of-the-month", getPaymentOfTheMonth);
router.patch("/delete-trip/:tripId", deleteTrip);
router.post("/get-trips-depending-on-challan-addition", getTripsFromTheChallan);
router.post("/get-trips-by-ids", getTripsByIds);
module.exports = router;
