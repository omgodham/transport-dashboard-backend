const express = require("express");
const {
	generateBill,
	getBills,
	updateBill,
	addTripToBill
} = require("../controllers-js/bill");
const router = express.Router();

router.post("/generate-bill", generateBill);
router.get("/get-bills", getBills);
router.patch("/update-bill/:bill", updateBill);
router.patch("/add-trip-to-bill/:bill", addTripToBill);

module.exports = router;
