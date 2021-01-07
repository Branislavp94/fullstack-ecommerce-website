const Order = require('../models/order');

exports.getOrders = async (req, res) => {
	try {
		const order = await Order.find({}).sort('-createdAd').populate('products.product').exec();
		res.json(order);
	} catch (error) {
		console.log(error);
	}
};
exports.updateOrders = async (req, res) => {
	try {
		const { orderStatus, orderId } = req.body;
		const updateOrders = await Order.findByIdAndUpdate(orderId, { orderStatus }).exec();
		res.json(updateOrders);
	} catch (error) {
		console.log(error);
	}
};
