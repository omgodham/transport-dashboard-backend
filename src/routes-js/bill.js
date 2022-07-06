const express = require("express");
const {
	generateBill,
	getBills,
	updateBill,
} = require("../controllers-js/bill");
const router = express.Router();

router.post("/generate-bill", generateBill);
router.get("/get-bills", getBills);
router.patch("/update-bill/:bill", updateBill);

module.exports = router;
