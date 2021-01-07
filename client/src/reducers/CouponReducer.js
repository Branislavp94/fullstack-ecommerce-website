export const couponReducer = (state = false, action) => {
	switch (action.type) {
		case 'ADD_COUPONS':
			return action.payload;
		default:
			return state;
	}
};
