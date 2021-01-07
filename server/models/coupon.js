const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const couponSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
			uppercase: true,
			unique: true,
			required: true,
			minlength: [ 3, 'To short' ],
			maxlength: [ 12, 'To long' ]
		},
		discount: {
			type: Number,
			required: true
		},
		expires: {
			type: Date,
			required: true
		},
		totalDiscountAmount: {
			type: Number
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Coupon', couponSchema);
