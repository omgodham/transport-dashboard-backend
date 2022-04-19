const express = require("express");
const {
	saveCompanyById,
	getCompanyById,
	createCompany,
	updateCompany,
	getAllCustomers,
	deleteCustomer,
} = require("../controllers-js/customer");
const app = express();
const router = express.Router();

router.param("/customer", saveCompanyById);
router.get("/get-customer/:customer", getCompanyById);
router.post("/create-customer", createCompany);
router.post("/delete-customer", deleteCustomer);
router.get("/get-all-customers", getAllCustomers);
router.patch("/update-customer/:customer", updateCompany);

module.exports = router;
