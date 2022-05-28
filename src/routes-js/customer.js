const express = require("express");
const {
	saveCustomerById,
	getCustomerById,
	createCustomer,
	updateCustomer,
	getAllCustomers,
	deleteCustomer,
} = require("../controllers-js/customer");
const app = express();
const router = express.Router();

router.param("customer", saveCustomerById);
router.get("/get-customer/:customer", getCustomerById);
router.post("/create-customer", createCustomer);
router.delete("/delete-customer/:customer", deleteCustomer);
router.get("/get-all-customers", getAllCustomers);
router.patch("/update-customer/:customer", updateCustomer);

module.exports = router;
