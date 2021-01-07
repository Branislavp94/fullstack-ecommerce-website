const Coupon = require('../models/coupon');

exports.create = async (req, res) => {
	try {

		const { name, discount, expires } = req.body;
		await new Coupon({
			name,
			discount,
			expires
		}).save((err, createCoupon) => {
			if (err) {
				res.status(400).json(err);
			} else {
				res.status(200).json(createCoupon);
			}
		});
	} catch (error) {
		console.log(error);
	}
};
exports.list = async (req, res) => {
	try {
		const findAllCoupon = await Coupon.find({}).exec();
		res.json(findAllCoupon);
	} catch (error) {
		console.log(error);
	}
};
exports.remove = async (req, res) => {
	try {
		const deleteCoupon = await Coupon.findByIdAndDelete({ _id: req.params._id }).exec();
		res.json(deleteCoupon);
	} catch (error) {
		console.log(error);
	}
};
