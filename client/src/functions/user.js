import axios from 'axios';

export const userCart = async (cart, authtoken) =>
	await axios.post(
		`${process.env.REACT_APP_API}/shop/cart`,
		{ cart },
		{
			headers: {
				authtoken
			}
		}
	);
export const GetUserCart = async (authtoken) =>
	await axios.get(`${process.env.REACT_APP_API}/shop/cart`, {
		headers: {
			authtoken
		}
	});

export const emtyCart = async (authtoken) =>
	await axios.delete(`${process.env.REACT_APP_API}/shop/cart`, {
		headers: {
			authtoken
		}
	});
export const userAdress = async (authtoken, adress) =>
	await axios.post(
		`${process.env.REACT_APP_API}/shop/adress`,
		{ adress },
		{
			headers: {
				authtoken
			}
		}
	);
export const totalDiscountAmount = async (authtoken, coupon) =>
	await axios.post(
		`${process.env.REACT_APP_API}/shop/coupons`,
		{ coupon },
		{
			headers: {
				authtoken
			}
		}
	);

export const createOrder = async (stripeResponse, authtoken) =>
	await axios.post(
		`${process.env.REACT_APP_API}/order`,
		{ stripeResponse },
		{
			headers: {
				authtoken
			}
		}
	);
export const getUserOrders = async (authtoken) =>
	await axios.get(`${process.env.REACT_APP_API}/user/orders`, {
		headers: {
			authtoken
		}
	});

// wishlist
export const addWishlist = async (authtoken, productId) =>
	await axios.post(
		`${process.env.REACT_APP_API}/user/wishlist`,
		{ productId },
		{
			headers: {
				authtoken
			}
		}
	);

export const wishlist = async (authtoken) =>
	await axios.get(`${process.env.REACT_APP_API}/user/wishlist`, {
		headers: {
			authtoken
		}
	});
export const RemoveWishlist = async (productId, authtoken) =>
	await axios.put(
		`${process.env.REACT_APP_API}/user/wishlist/${productId}`,
		{ productId },
		{
			headers: {
				authtoken
			}
		}
	);

//cash on delivery

export const createOrderCash = async (cash, appliedCoupon, authtoken) =>
	await axios.post(
		`${process.env.REACT_APP_API}/orderCash`,
		{ cash, appliedCoupon },
		{
			headers: {
				authtoken
			}
		}
	);
