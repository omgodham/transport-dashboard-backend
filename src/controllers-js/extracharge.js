const Extracharge = require("../models-js/extracharge");

exports.getAllExtraCharges = (req, res) => {
	Extracharge.find({})
		.then((response) => {
			if (response) {
				res.status(200).json(response);
			} else return res.status(404).json({ message: "ExtraCharge not found" });
		})
		.catch((error) => {
			return res.status(404).json({ message: "Internal Server Error" });
		});
};

exports.saveExtraChargeById = (req, res, next, id) => {
	Extracharge.findById(id)
		.then((response) => {
			if (response) {
				req.extraCharge = response;
				next();
			} else return res.status(404).json({ message: "ExtraCharge not found" });
		})
		.catch((error) => {
			return res.status(404).json({ message: "Internal Server Error" });
		});
};

exports.getExtraChargeById = (req, res) => {
	return res.status(200).json(req.extraCharge);
};

exports.createExtraCharge = (req, res) => {
	const extraCharge = new Extracharge(req.body.data);
	extraCharge
		.save()
		.then((response) => {
			if (response) return res.status(200).json(response);

			return res.status(404).json({ message: "ExtraCharge creation failed" });
		})
		.catch((error) => {
			return res.status(404).json({ message: "Internal Server Error" });
		});
};

exports.updateExtraCharge = (req, res) => {
	Extracharge.findByIdAndUpdate(
		req.params.extraCharge,
		{ $set: req.body.data },
		{ new: true, useFindAndModify: false }
	)
		.then((response) => {
			if (response) return res.status(200).json(response);

			return res.status(404).json({ message: "ExtraCharge updation failed" });
		})
		.catch((error) => {
			return res.status(404).json({ message: "Internal Server Error" });
		});
};

exports.deleteExtraCharge = (req, res) => {
	Extracharge.findByIdAndDelete(req.params.extraCharge)
		.then((response) => {
			if (response) return res.status(200).json(response);
			else
				return res.status(500).json({ message: "ExtraCharge deletion failed" });
		})
		.catch((error) => {
			return res.status(500).json({ message: "Internal Server Error" });
		});
};
