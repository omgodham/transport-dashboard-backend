const Trip = require("../models-js/trip");
const Driver = require("../models-js/driver");
exports.getAllTrips = (req, res) => {
	const todayStart = new Date(
		new Date(req.body.startDate).setHours(0, 0, 0, 0)
	);
	const todayEnd = new Date(
		new Date(req.body.endDate).setHours(23, 59, 59, 999)
	);

	Trip.find({
		createdAt: {
			$gte: todayStart,
			$lt: todayEnd,
		},
	})
		.then((response) => {
			if (response) {
				return res.status(200).json(response);
			} else return res.status(500).json({ message: "Trip not found" });
		})
		.catch((error) => {
			console.log(error);
			return res.status(404).json({ message: "Internal Server Error" });
		});
};

exports.getTripByLr = (req, res) => {
	Trip.find({ lrNo: req.params.LrNo })
		.then((response) => {
			if (response) {
				return res.status(200).json(response);
			} else return res.status(500).json({ message: "Trip not found" });
		})
		.catch((error) => {
			return res.status(404).json({ message: "Internal Server Error" });
		});
};

exports.getTripByCustomer = (req, res) => {
	const todayStart = new Date(
		new Date(req.body.startDate).setHours(0, 0, 0, 0)
	);
	const todayEnd = new Date(
		new Date(req.body.endDate).setHours(23, 59, 59, 999)
	);

	Trip.find({
		customer: req.params.customer,
		company: req.body.company,
		createdAt: {
			$gte: todayStart,
			$lt: todayEnd,
		},
	})
		.then((response) => {
			if (response) {
				return res.status(200).json(response);
			} else return res.status(500).json({ message: "Trip not found" });
		})
		.catch((error) => {
			return res.status(404).json({ message: "Internal Server Error" });
		});
};

exports.getTripByDriver = (req, res) => {
	const todayStart = new Date(
		new Date(req.body.startDate).setHours(0, 0, 0, 0)
	);
	const todayEnd = new Date(
		new Date(req.body.endDate).setHours(23, 59, 59, 999)
	);

	Trip.find({
		driver: req.params.driver,
		createdAt: {
			$gte: todayStart,
			$lt: todayEnd,
		},
	})
		.then((response) => {
			if (response) {
				return res.status(200).json(response);
			} else return res.status(500).json({ message: "Trip not found" });
		})
		.catch((error) => {
			return res.status(404).json({ message: "Internal Server Error" });
		});
};

exports.saveTripById = (req, res, next, id) => {
	Trip.findById(id)
		.then((response) => {
			if (response) {
				req.trip = response;
				next();
			} else return res.status(404).json({ message: "Trip not found" });
		})
		.catch((error) => {
			return res.status(404).json({ message: "Internal Server Error" });
		});
};

exports.getTripById = (req, res) => {
	return res.status(200).json(req.trip);
};

exports.createTrip = (req, res) => {
	const trip = new Trip(req.body.data);
	trip
		.save()
		.then((response) => {
			Driver.findOneAndUpdate(
				{ _id: req.body.data.driver },
				{
					$push: { trips: response._id },
				},
				{ new: true, useFindAndModify: false }
			).exec();

			if (response) return res.status(200).json(response);

			return res.status(404).json({ message: "Trip creation failed" });
		})
		.catch((error) => {
			return res.status(404).json({ message: "Internal Server Error" });
		});
};

exports.updateTrip = (req, res) => {
	Trip.findByIdAndUpdate(
		req.params.trip,
		{ $set: req.body.data },
		{ new: true, useFindAndModify: false }
	)
		.then((response) => {
			console.log(req.params.trip);
			if (response) return res.status(200).json(response);

			return res.status(404).json({ message: "Trip updation failed" });
		})
		.catch((error) => {
			return res.status(404).json({ message: "Internal Server Error" });
		});
};
