const express = require("express");
const router = express.Router();

router.post("/signUp", function (req, res) {
  WooCommerce.get("customers")
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error.response.data);
    });
});
module.exports = router;
