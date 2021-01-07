export const drawerReducer = (state = false, action) => {
	switch (action.type) {
		case 'SHOW_DRAWER':
			return action.payload;
		default:
			return state;
	}
};
