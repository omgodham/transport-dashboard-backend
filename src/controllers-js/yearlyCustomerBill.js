const YearlyCustomerBill = require("../models-js/yearlyCustomerBill");
const { getBillsByCustomer } = require("./bill");

exports.generateYearlyBill = async (req, res) => {
  try {
    const yearlyBill = new YearlyCustomerBill(req.body);
    let number;

    let temp = await YearlyCustomerBill.findOne()
      .sort({ _id: -1 })
      .limit(1)
      .exec();

    number = temp ? parseInt(temp.billNo ? temp.billNo : "0000") + 1 : "0001";

    yearlyBill.billNo = number;
    let billRes = await getBillsByCustomer(req);
    yearlyBill.monthlyBills = billRes;
    yearlyBill
      .save()
      .then((response) => {
        if (response) return res.status(200).json(response);

        return res
          .status(404)
          .json({ message: "Yearly Bill generation failed" });
      })
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    return res.status(404).json({ message: "Internal Server Error" });
  }
};

exports.refetchYearlyBill = async (req, res) => {
  try {
    let yearlyBill = await YearlyCustomerBill.findOne({
      _id: req.params.yearlyBillId,
    });
    let billRes = await getBillsByCustomer({ body: yearlyBill });
    if (!billRes.length) {
      throw new Error("No new data found");
    }
    YearlyCustomerBill.findOneAndUpdate(
      { _id: req.params.yearlyBillId },
      {
        $set: { monthlyBills: billRes },
      },
      { new: true, useFindAndModify: false }
    )
      .then((response) => {
        if (response) return res.status(200).json(response);

        return res.status(404).json({ message: "Yearly Bill refetch failed" });
      })
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

exports.getYearlyBill = (req, res) => {
  YearlyCustomerBill.findOne({ _id: req.params.yearlyBillId })
    .then((response) => {
      if (response) return res.status(200).json(response);

      return res.status(404).json({ message: "Bill not found" });
    })
    .catch((error) => {
      return res.status(404).json({ message: error.message });
    });
};


exports.getYearlyBills = (req, res) => {
	YearlyCustomerBill.find().sort({createdAt:-1})
		.then((response) => {
			if (response) return res.status(200).json(response);

			return res.status(404).json({ message: "Bills not found" });
		})
		.catch((error) => {
			return res.status(404).json({ message: error.message });
		});
};
exports.deleteAllYearlyBills = (req, res) => {
	YearlyCustomerBill.deleteMany({})
		.then((response) => {
	    return res.status(200).json(response);
		})
		.catch((error) => {
			return res.status(404).json({ message: error.message });
		});
};
exports.deleteYearlyBill = (req, res) => {
	YearlyCustomerBill.findByIdAndDelete(req.params.yearlyBillId)
		.then((response) => {
	    return res.status(200).json({status:'success',message:'Bill deleted successfully'});
		})
		.catch((error) => {
			return res.status(404).json({ message: error.message });
		});
};
