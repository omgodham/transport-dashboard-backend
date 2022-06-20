const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const companySchema = new Schema({
	name: String,
	address: String,
	phoneNo: String,
	gstNo: String,
});

module.exports = mongoose.model("Company", companySchema);
