const Company = require("../models-js/company");
const Trip = require("../models-js/trip");

exports.getAllCompanies = (req, res) => {
	Company.find({})
		.then((response) => {
			if (response) {
				res.status(200).json(response);
			} else return res.status(404).json({ message: "Company not found" });
		})
		.catch((error) => {
			return res.status(404).json({ message: "Internal Server Error" });
		});
};

exports.saveCompanyById = (req, res, next, id) => {
	Company.findById(id)
		.then((response) => {
			if (response) {
				req.company = response;
				next();
			} else return res.status(404).json({ message: "Company not found" });
		})
		.catch((error) => {
			return res.status(404).json({ message: "Internal Server Error" });
		});
};

exports.getCompanyById = (req, res) => {
	return res.status(200).json(req.company);
};

exports.createCompany = (req, res) => {
	const company = new Company(req.body.data);
	company
		.save()
		.then((response) => {
			if (response) return res.status(200).json(response);

			return res.status(404).json({ message: "Company creation failed" });
		})
		.catch((error) => {
			return res.status(404).json({ message: "Internal Server Error" });
		});
};

exports.updateCompany = (req, res) => {
	const company = new Company(req.body.data);
	Company.findByIdAndUpdate(
		req.params.company,
		{ $set: req.body.data },
		{ new: true, useFindAndModify: false }
	)
		.then((response) => {
			if (response) return res.status(200).json(response);

			return res.status(404).json({ message: "Company updation failed" });
		})
		.catch((error) => {
			return res.status(404).json({ message: "Internal Server Error" });
		});
};

exports.deleteCompany = (req, res) => {
	Company.findByIdAndDelete(req.params.company)
		.then((response) => {
			if (response) return res.status(200).json(response);
			else return res.status(500).json({ message: "Company deletion failed" });
		})
		.catch((error) => {
			return res.status(500).json({ message: "Internal Server Error" });
		});
};
