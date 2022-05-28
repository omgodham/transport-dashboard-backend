const Driver = require("../models-js/driver");

exports.getAllDrivers = (req, res) => {
	Driver.find({})
		.then((response) => {
			if (response) {
				res.status(200).json(response);
			} else return res.status(404).json({ message: "Driver not found" });
		})
		.catch((error) => {
			return res.status(404).json({ message: "Internal Server Error" });
		});
};

exports.saveDriverById = (req, res, next, id) => {
	Driver.findById(id)
		.then((response) => {
			if (response) {
				req.driver = response;
				next();
			} else return res.status(404).json({ message: "Driver not found" });
		})
		.catch((error) => {
			return res.status(404).json({ message: "Internal Server Error" });
		});
};

exports.getDriverById = (req, res) => {
	return res.status(200).json(req.driver);
};

exports.createDriver = (req, res) => {
	const driver = new Driver(req.body.data);

	driver
		.save()
		.then((response) => {
			if (response) return res.status(200).json(response);

			return res.status(404).json({ message: "Driver creation failed" });
		})
		.catch((error) => {
			return res.status(404).json({ message: "Internal Server Error" });
		});
};

exports.updateDriver = (req, res) => {
	Driver.findByIdAndUpdate(
		req.params.driver,
		{ $set: req.body.data },
		{ new: true, useFindAndModify: false }
	)
		.then((response) => {
			if (response) return res.status(200).json(response);

			return res.status(404).json({ message: "Driver updation failed" });
		})
		.catch((error) => {
			return res.status(404).json({ message: "Internal Server Error" });
		});
};

exports.deleteDriver = (req, res) => {
	Driver.findByIdAndDelete(req.driver._id)
		.then((response) => {
			if (response) return res.status(200).json(response);
			else return res.status(500).json({ message: "Driver deletion failed" });
		})
		.catch((error) => {
			return res.status(500).json({ message: "Internal Server Error" });
		});
};
