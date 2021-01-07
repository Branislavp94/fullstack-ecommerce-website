export const CashDelivery = (state = false, action) => {
	switch (action.type) {
		case 'PAY_CASH':
			return action.payload;
		default:
			return state;
	}
};
