const Customer = require("../models-js/customer");

exports.getAllCustomers = (req, res) => {
	Customer.find({})
		.then((response) => {
			if (response) {
				res.status(200).json(response);
			} else return res.status(404).json({ message: "Customer not found" });
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
			} else return res.status(404).json({ message: "Customer not found" });
		})
		.catch((error) => {
			return res.status(404).json({ message: "Internal Server Error" });
		});
};

exports.getCompanyById = (req, res) => {
	return res.status(200).json(req.customer);
};

exports.createCompany = (req, res) => {
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
	const customer = new Customer(req.body.data);
	Customer.findByIdAndUpdate(
		req.params.customer,
		{ $set: req.body.data },
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

exports.deleteCustomer = (req, res) => {
	Customer.findByIdAndDelete(req.customer._id)
		.then((response) => {
			if (response) return res.status(200).json(response);
			else return res.status(500).json({ message: "Customer deletion failed" });
		})
		.catch((error) => {
			return res.status(500).json({ message: "Internal Server Error" });
		});
};
