const Product = require('../models/product');
const UserCart = require('../models/cart');
const User = require('../models/user');
const Coupon = require('../models/coupon');
const Order = require('../models/order');
const uniqueid = require('uniqueid');

exports.UserCart = async (req, res) => {
	try {
		const { cart } = req.body;
		let products = [];

		//find the user
		const user = await User.findOne({ email: req.user.email }).exec();
		//find if user put something in cart
		let cartUser = await UserCart.findOne({ orderedBy: user._id });
		//if exist remove the user
		if (cartUser) {
			cartUser.remove();
		}

		for (let i = 0; i < cart.length; i++) {
			let object = [];
			object.product = cart[i]._id;
			object.count = cart[i].count;
			object.color = cart[i].color;
			//cartTotal
			let productsPrice = await Product.findById(cart[i]._id).select('price').exec();
			object.price = productsPrice.price;

			products.push(object);
		}
		let cartTotal = 0;
		for (let i = 0; i < products.length; i++) {
			cartTotal = cartTotal + products[i].price * products[i].count;
		}
		let newCart = await new UserCart({
			products,
			cartTotal,
			orderedBy: user._id
		}).save();
		console.log('Novi product', newCart);
		res.json({ ok: true });
	} catch (error) {
		console.log(error);
	}
};

exports.getUserCart = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.user.email }).exec();
		const productCart = await UserCart.findOne({ orderedBy: user._id })
			.populate('products.product', '_id title price totalAfterDiscount')
			.exec();
		// const { products, cartTotal, totalAfterDiscount } = productCart;
		res.json(productCart);
	} catch (error) {
		console.log(error);
	}
};

exports.deleteUserCart = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.user.email }).exec();
		const emtyCart = await UserCart.findOneAndRemove({ orderedBy: user._id }).exec();
		res.json(emtyCart);
	} catch (error) {
		console.log(error);
	}
};

exports.userAdress = async (req, res) => {
	try {
		await User.findOneAndUpdate({ email: req.user.email }, { adress: req.body.adress }).exec();
		res.json({ ok: true });
	} catch (error) {
		console.log(error);
	}
};
exports.totalDiscountAmount = async (req, res) => {
	try {
		const { coupon } = req.body;
		const ValidCoupon = await Coupon.findOne({ name: coupon }).exec();
		if (ValidCoupon === null) {
			res.json({ err: 'invalid Coupon' });
		} else {
			console.log('valid Coupon', ValidCoupon);
		}
		const user = await User.findOne({ email: req.user.email }).exec();
		console.log(user);
		let { product, cartTotal } = await UserCart.findOne({ orderedBy: user._id })
			.populate('products.product _id title price')
			.exec();

		let totalAfterDiscount = (cartTotal - cartTotal * ValidCoupon.discount / 100).toFixed(2); // 99.99

		UserCart.findOneAndUpdate({ orderedBy: user._id }, { totalAfterDiscount }, { new: true }).exec();
		res.json(totalAfterDiscount);
	} catch (error) {
		console.log(error);
	}
};

exports.orderCreate = async (req, res) => {
	try {
		const { paymentIntent } = req.body.stripeResponse;
		const user = await User.findOne({ email: req.user.email }).exec();
		const { products } = await UserCart.findOne({ orderedBy: user._id }).exec();

		let newOrder = new Order({
			paymentIntent,
			products,
			orderedBy: user._id
		}).save();

		console.log('new order', newOrder);
		res.json({ ok: true });
	} catch (error) {
		console.log(error);
	}
};
exports.orders = async (req, res) => {
	let user = await User.findOne({ email: req.user.email }).exec();
	let userOrders = await Order.find({ orderedBy: user._id }).populate('products.product').exec();
	res.json(userOrders);
};
// wishlist
exports.addWishlist = async (req, res) => {
	try {
		const { productId } = req.body;
		const user = await User.findOneAndUpdate(
			{ email: req.user.email },
			{ $addToSet: { wishlist: productId } }
		).exec();
		res.json({ ok: true });
	} catch (error) {
		console.log(error);
	}
};
exports.Wishlist = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.user.email }).select('wishlist').populate('wishlist').exec();
		res.json(user);
	} catch (error) {
		console.log(error);
	}
};
exports.removeWishlist = async (req, res) => {
	try {
		const { productId } = req.body;
		const user = await User.findOneAndUpdate({ email: req.user.email }, { $pull: { wishlist: productId } }).exec();
		res.json(user);
	} catch (error) {
		console.log(error);
	}
};

exports.orderCreateCash = async (req, res) => {
	try {
		const { cash, appliedCoupon } = req.body;
		if (!cash) {
			res.status(404).json('No cash delivery');
		}
		const user = await User.findOne({ email: req.user.email }).exec();
		const userProduct = await UserCart.findOne({ orderedBy: user._id }).exec();

		let finalTotal = 0;

		if (appliedCoupon && userProduct.totalAfterDiscount) {
			finalTotal = userProduct.totalAfterDiscount * 100;
		} else {
			finalTotal = userProduct.cartTotal * 100;
		}

		let newOrder = new Order({
			products: userProduct.products,
			paymentIntent: {
				id: uniqueid(),
				amount: finalTotal,
				currency: 'usd',
				status: 'Cash on Delivery',
				created: Date.now(),
				payment_method_types: [ 'cash' ]
			},
			orderBy: user._id,
			status: 'Cash on Delivery'
		}).save();
		console.log('new order', newOrder);
		res.json(newOrder);
	} catch (error) {
		console.log(error);
	}
};
