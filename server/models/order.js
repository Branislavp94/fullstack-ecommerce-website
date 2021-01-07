const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const order = new mongoose.Schema(
	{
		products: [
			{
				product: {
					type: ObjectId,
					ref: 'Product'
				},
				count: Number,
				color: String
			}
		],
		paymentIntent: {},
		orderStatus: {
			type: String,
			default: 'Not Proccessed',
			enum: [ 'Not Proccessed', 'Cash on Delivery', 'Proccessed', 'Completed', 'Canceled', 'Dispatched' ]
		},
		orderedBy: {
			type: ObjectId,
			ref: 'User'
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Order', order);
