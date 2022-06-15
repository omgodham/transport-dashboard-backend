const express = require("express");
const {
  saveCustomerById,
  getCustomerById,
  createCustomer,
  updateCustomer,
  getAllCustomers,
  deleteCustomer,
  getTotalPaymentOfTheMonthOfCustomer,
} = require("../controllers-js/customer");
const app = express();
const router = express.Router();

router.param("customer", saveCustomerById);
router.get("/get-customer/:customer", getCustomerById);
router.post("/create-customer", createCustomer);
router.delete("/delete-customer/:customer", deleteCustomer);
router.get("/get-all-customers", getAllCustomers);
router.patch("/update-customer/:customer", updateCustomer);
router.post(
  "/get-total-payment-of-the-month-of-customer",
  getTotalPaymentOfTheMonthOfCustomer
);
module.exports = router;
