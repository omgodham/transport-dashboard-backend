const Company = require("../models/company");

exports.saveCompanyById = (req, res, next, id) => {
  Company.findById(id)
    .then((response) => {
      if (response) {
        req.company = response;
        next();
        return "";
      }
      return res.status(404).json({ message: "Company not found" });
    })
    .catch((error) => {
      return res.status(404).json({ message: "Internal Server Error" });
    });
};

exports.getCompanyById = (req, res) => {
  return res.status(200).json(req.company);
};

exports.createCompany = (req, res) => {
  const company = new Company(req.body);
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
  Company.findByIdAndUpdate(
    req.company._id,
    { $set: req.body },
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
