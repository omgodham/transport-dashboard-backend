const express = require("express");
const {
	saveCompanyById,
	getCompanyById,
	createCompany,
	updateCompany,
	getAllCutomers,
} = require("../controllers-js/customer");
const app = express();
const router = express.Router();

router.param("/customer", saveCompanyById);
router.get("/getAllCutomers", getAllCutomers);
router.get("/get-customer/:customer", getCompanyById);
router.post("/create-customer", createCompany);
router.patch("/update-customer/:customer", updateCompany);

module.exports = router;
