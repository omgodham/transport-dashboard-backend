const express = require("express");
const {
  saveDriverById,
  getDriverById,
  createDriver,
  updateDriver,
  getAllDrivers,
  deleteDriver,
} = require("../controllers-js/driver");
const app = express();
const router = express.Router();

router.param("driver", saveDriverById);
router.get("/get-driver/:driver", getDriverById);
router.post("/create-driver", createDriver);
router.delete("/delete-driver/:driver", deleteDriver);
router.get("/get-all-drivers", getAllDrivers);
router.patch("/update-driver/:driver", updateDriver);

module.exports = router;
