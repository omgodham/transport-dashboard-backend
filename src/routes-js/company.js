const express = require("express");
const {
	deleteCompany,
	updateCompany,
	createCompany,
	saveCompanyById,
	getAllCompanies,
} = require("../controllers-js/company");
const app = express();
const router = express.Router();

router.post("/create-company", createCompany);
router.delete("/delete-company/:company", deleteCompany);
router.get("/get-all-companies", getAllCompanies);
router.patch("/update-company/:company", updateCompany);
module.exports = router;
