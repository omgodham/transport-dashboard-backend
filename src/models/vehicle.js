const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const vehicleSchema = new Schema(
	{
		name: String,
		number: String,
		maintenance: Array,
		//   demo:
		//[{
		// description: "",
		// amount:0
		//   }]
	},
	{ timestamps: true }
);
module.exports = mongoose.model("Vehicle", vehicleSchema);
