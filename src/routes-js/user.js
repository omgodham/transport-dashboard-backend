const express = require("express");
const router = express.Router();
var WooCommerceAPI = require("woocommerce-api");

var WooCommerce = new WooCommerceAPI({
	url: "https://fancykatta.com",
	consumerKey: "ck_38015d77f8426072571cfcee33ed7ec21a15273d",
	consumerSecret: "cs_aac3914ad3330dc9cde9537ef8983cf384b3d6c3",
	wpAPI: true,
	version: "wc/v1",
});

router.get("/get-all-customers", function (req, res) {
	WooCommerce.get("customers")
		.then((response) => {
			console.log(response.data);
		})
		.catch((error) => {
			console.log(error.response.data);
		});
});
module.exports = router;
