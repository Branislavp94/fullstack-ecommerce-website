import { combineReducers } from 'redux';
import { cartReducer } from './CartReducer';
import { CashDelivery } from './CashDelivery';
import { couponReducer } from './CouponReducer';
import { drawerReducer } from './DrawerReducer';
import { searchReducer } from './searchReducer';
import { userReducer } from './userReducer';

const rootReducer = combineReducers({
	user: userReducer,
	search: searchReducer,
	cart: cartReducer,
	drawer: drawerReducer,
	coupon: couponReducer,
	cash: CashDelivery
});

export default rootReducer;
