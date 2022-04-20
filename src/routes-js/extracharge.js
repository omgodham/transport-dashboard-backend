const express = require("express");
const {
  saveExtraChargeById,
  getExtraChargeById,
  createExtraCharge,
  updateExtraCharge,
  getAllExtraCharges,
  deleteExtraCharge,
} = require("../controllers-js/extracharge");
const app = express();
const router = express.Router();

router.param("extraCharge", saveExtraChargeById);
router.get("/get-extra-charge/:extraCharge", getExtraChargeById);
router.post("/create-extra-charge", createExtraCharge);
router.delete("/delete-extra-charge/:extraCharge", deleteExtraCharge);
router.get("/get-all-extra-charges", getAllExtraCharges);
router.patch("/update-extra-charge/:extraCharge", updateExtraCharge);

module.exports = router;
