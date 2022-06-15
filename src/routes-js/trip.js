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
router.post("/get-payment-of-the-month", getPaymentOfTheMonth);
router.patch("/delete-trip/:tripId", deleteTrip);

module.exports = router;
