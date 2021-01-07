const User = require('../models/user');
const UserCart = require('../models/cart');
const Product = require('../models/product');
const Coupon = require('../models/coupon');
const stripe = require('stripe')(process.env.STRIPE_SECRET);

exports.createPaymentIntent = async (req, res) => {
	const { appliedCoupon } = req.body;
	const user = await User.findOne({ email: req.user.email }).exec();
	const { cartTotal, totalAfterDiscount } = await UserCart.findOne({ orderedBy: user._id }).exec();

	let finalTotal = 0;

	if (appliedCoupon && totalAfterDiscount) {
		finalTotal = totalAfterDiscount * 100;
	} else {
		finalTotal = cartTotal * 100;
	}

	const paymentIntent = await stripe.paymentIntents.create({
		amount: finalTotal,
		currency: 'usd'
	});

	res.send({
		clientSecret: paymentIntent.client_secret,
		cartTotal,
		totalAfterDiscount,
		payload: finalTotal
	});
};
