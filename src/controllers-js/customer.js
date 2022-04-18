const Customer = require("../models/customer");

exports.getAllCutomers = (req, res, next, id) => {
	console.log("HERE");
	Customer.find()
		.then((response) => {
			if (response) {
				res.status(200).json(response);
			}
			return res.status(404).json({ message: "Customer not found" });
		})
		.catch((error) => {
			return res.status(404).json({ message: "Internal Server Error" });
		});
};

exports.saveCompanyById = (req, res, next, id) => {
	Customer.findById(id)
		.then((response) => {
			if (response) {
				req.customer = response;
				next();
				return "";
			}
			return res.status(404).json({ message: "Customer not found" });
		})
		.catch((error) => {
			return res.status(404).json({ message: "Internal Server Error" });
		});
};

exports.getCompanyById = (req, res) => {
	return res.status(200).json(req.customer);
};

exports.createCompany = (req, res) => {
	console.log(req.body, "CUSTOMER");
	const customer = new Customer(req.body.data);
	customer
		.save()
		.then((response) => {
			if (response) return res.status(200).json(response);

			return res.status(404).json({ message: "Customer creation failed" });
		})
		.catch((error) => {
			return res.status(404).json({ message: "Internal Server Error" });
		});
};

exports.updateCompany = (req, res) => {
	Customer.findByIdAndUpdate(
		req.customer._id,
		{ $set: req.body },
		{ new: true, useFindAndModify: false }
	)
		.then((response) => {
			if (response) return res.status(200).json(response);

			return res.status(404).json({ message: "Customer updation failed" });
		})
		.catch((error) => {
			return res.status(404).json({ message: "Internal Server Error" });
		});
};
