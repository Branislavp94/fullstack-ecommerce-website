import axios from 'axios';

export const getAllOrders = async (authtoken) =>
	await axios.get(`${process.env.REACT_APP_API}/admin/getOrders`, {
		headers: {
			authtoken
		}
	});
export const updateOrders = async (authtoken, orderId, orderStatus) =>
	await axios.put(
		`${process.env.REACT_APP_API}/admin/updateOrders`,
		{ orderId, orderStatus },
		{
			headers: {
				authtoken
			}
		}
	);
