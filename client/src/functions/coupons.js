import axios from 'axios';

export const createCopunos = async (createCoupon, authtoken) =>
	await axios.post(`${process.env.REACT_APP_API}/coupons`, createCoupon, {
		headers: {
			authtoken
		}
	});
export const getAllCopunos = async () => await axios.get(`${process.env.REACT_APP_API}/coupons`);

export const deleteCopunos = async (_id, authtoken) =>
	await axios.delete(`${process.env.REACT_APP_API}/coupons/${_id}`, {
		headers: {
			authtoken
		}
	});
