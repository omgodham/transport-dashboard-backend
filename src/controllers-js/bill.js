const Bill = require("../models-js/bill");
const Trip = require("../models-js/trip");

exports.generateBill = async (req, res) => {
	const bill = new Bill(req.body.data);

	let number;

	let temp = await Bill.findOne().sort({ _id: -1 }).limit(1).exec();

	number = temp ? parseInt(temp.billNo ? temp.billNo : "0000") + 1 : "0001";

	bill.billNo = number;

	bill
		.save()
		.then((response) => {
			if (response) return res.status(200).json(response);

			return res.status(404).json({ message: "Bill generation failed" });
		})
		.catch((error) => {
			return res.status(404).json({ message: "Internal Server Error" });
		});
};

exports.getBills = (req, res) => {
	Bill.find()
		.then((response) => {
			if (response) return res.status(200).json(response);

			return res.status(404).json({ message: "Bill generation failed" });
		})
		.catch((error) => {
			return res.status(404).json({ message: "Internal Server Error" });
		});
};

exports.updateBill = (req, res) => {
	Bill.findByIdAndUpdate(
		req.params.bill,
		{ $set: req.body.data },
		{ new: true, useFindAndModify: false }
	)
		.then((response) => {
			if (response) return res.status(200).json(response);

			return res.status(404).json({ message: "Bill updation failed" });
		})
		.catch((error) => {
			return res.status(404).json({ message: "Internal Server Error" });
		});
};
exports.addTripToBill = async (req, res) => {
	let trip = await Trip.findOne({billNo:req.body.tripBillNo});
	if(!trip){
		return res.status(404).json({ message: "Trip not found" });
	}
	if(trip.company != req.body.companyId){
		return res.status(404).json({ message: "Trip not belongs to the same company" });
	}
	let previousTrips = req.body.previousTrips;
	previousTrips.push(trip._id)
	Bill.findByIdAndUpdate(
		req.params.bill,
		{ $set: {trips:previousTrips}},
		{ new: true, useFindAndModify: false }
	)
		.then((response) => {
			if (response) return res.status(200).json(response);

			return res.status(404).json({ message: "Bill updation failed" });
		})
		.catch((error) => {
			return res.status(404).json({ message: "Internal Server Error" });
		});
};

exports.getBillsByCustomer = async (req) =>  {
	const todayStart = new Date(
		new Date(req.body.startDate).setHours(0, 0, 0, 0)
	);
	const todayEnd = new Date(
		new Date(req.body.endDate).setHours(23, 59, 59, 999)
	);
	let query = {
		customer: req.body.customer,
		company: req.body.company,
	}
	if (req.body.billDate) {
		query.billDate = {
			$gte: todayStart,
			$lt: todayEnd
		};
	} else {
		query.createdAt= {
			$gte: todayStart,
			$lt: todayEnd,
		}
	}
	return await Bill.find(query)
		.then(async (response) => {
			const tripsResponse = await Promise.all(response.map(async (bill) => {
				const trips = await Trip.find({ _id: { $in: bill.trips } }).select('totalPayment lrCharges extraCharge');
				   // Calculate the sum of specified fields
				   const totalPaymentSum = trips.reduce((sum, trip) => sum + (trip.totalPayment || 0), 0);
				   const lrChargesSum = trips.reduce((sum, trip) => sum + (trip.lrCharges || 0), 0);
				   const extraChargeSum = trips.reduce((sum, trip) => sum + (trip.extraCharge || 0), 0);
				return {
					billId:bill._id,
					billNo:bill.billNo,
					billDate:bill.billDate ? bill.billDate : bill.createdAt, 
					totalSumOfTrips : totalPaymentSum + lrChargesSum + extraChargeSum,
					isPaid:bill.isPaid
				};
			}));
			return tripsResponse
		})
		.catch((error) => error);
};