const express = require('express');
const {
	UserCart,
	getUserCart,
	deleteUserCart,
	userAdress,
	totalDiscountAmount,
	orderCreate,
	orders,
	addWishlist,
	removeWishlist,
	Wishlist,
	orderCreateCash
} = require('../controllers/userCart');

const router = express.Router();
//auth check
const { authCheck } = require('../middlewares/auth');
// user Cart
router.post('/shop/cart', authCheck, UserCart);
router.get('/shop/cart', authCheck, getUserCart);
router.delete('/shop/cart', authCheck, deleteUserCart);
router.post('/shop/adress', authCheck, userAdress);
// coupons User
router.post('/shop/coupons', authCheck, totalDiscountAmount);
//order
router.post('/order', authCheck, orderCreate);
router.get('/user/orders', authCheck, orders);
//cash on delivery
router.post('/orderCash', authCheck, orderCreateCash);
//wishlist
router.post('/user/wishlist', authCheck, addWishlist);
router.get('/user/wishlist', authCheck, Wishlist);
router.put('/user/wishlist/:productId', authCheck, removeWishlist);
// test
router.get('/user', (req, res) => {
	res.json({
		data: 'hey you hit user API endpoint'
	});
});

module.exports = router;
