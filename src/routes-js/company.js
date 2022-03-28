const express = require("express");
const {
  saveCompanyById,
  getCompanyById,
  createCompany,
  updateCompany,
} = require("../controllers-js/company");
const app = express();
const router = express.Router();

router.param("company", saveCompanyById);

router.get("/get-company/:company", getCompanyById);
router.post("/create-company", createCompany);
router.patch("/update-company/:company", updateCompany);

module.exports = router;
