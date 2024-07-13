const express = require("express");
const {
	generateYearlyBill,
	getYearlyBill,
	refetchYearlyBill,
	getYearlyBills,
	deleteAllYearlyBills,
	deleteYearlyBill
} = require("../controllers-js/yearlyCustomerBill");
const router = express.Router();

router.post("/generate-yearly-customer-bill", generateYearlyBill);
router.get("/get-yearly-customer-bills", getYearlyBills);
router.get("/refetch-yearly-customer-bill/:yearlyBillId", refetchYearlyBill);
router.get("/get-yearly-customer-bill/:yearlyBillId", getYearlyBill);
router.delete("/delete-all-yearly-bills", deleteAllYearlyBills);
router.delete("/delete-yearly-bill/:yearlyBillId", deleteYearlyBill);
module.exports = router;
