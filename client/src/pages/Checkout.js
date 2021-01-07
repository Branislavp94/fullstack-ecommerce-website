import React from 'react';
import { emtyCart, GetUserCart, totalDiscountAmount, userAdress, createOrderCash } from '../functions/user';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // ES6
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

const Checkout = () => {
	const { user, cart, cash } = useSelector((state) => ({ ...state }));
	const couponTrueOrFalse = useSelector((state) => state.coupon);
	const dispatch = useDispatch();
	const [ product, setProduct ] = useState([]);
	const [ cartTotal, setTotalCount ] = useState(0);
	const [ adress, setAdress ] = useState([]);
	const [ saveAdress, setSaveAdress ] = useState(false);
	const [ coupon, setCoupon ] = useState('');
	const [ totaDiscount, setTotaDiscount ] = useState('');
	const [ totaDiscountError, setTotaDiscountError ] = useState('');
	const history = useHistory();

	//save adress
	const saveAddressToDb = () => {
		console.log(adress);
		userAdress(user.token, adress).then((res) => {
			if (res.data.ok) {
				setSaveAdress(true);
				toast.success('Adress has been Added Succsesfully');
			}
		});
	};
	useEffect(() => {
		GetUserCart(user.token).then((res) => {
			console.log(res);
			setProduct(res.data?.products);
			setTotalCount(res.data.cartTotal);
		});
	}, []);

	const emptyCard = () => {
		if (typeof window !== 'undefined') {
			localStorage.getItem('cart');
			// remove from redux
			dispatch({
				type: 'ADD_TO_CART',
				payload: []
			});
			//remove from backend
			emtyCart(user.token).then((response) => {
				console.log(response);
				setProduct([]);
				setTotalCount(0);
			});
		}
	};
	//DiscountAmount
	const DiscountAmountChanged = (e) => {
		setCoupon(e.target.value);
		setTotaDiscountError('');
	};
	//applyDiscount
	const applyDiscount = (e) => {
		e.preventDefault();
		totalDiscountAmount(user.token, coupon).then((res) => {
			if (res.data) {
				console.log(res);
				setTotaDiscount(res.data);
				// redux
				dispatch({
					type: 'ADD_COUPONS',
					payload: true
				});
			}
			if (res.data.err) {
				setTotaDiscountError(res.data.err);
				//redux
				dispatch({
					type: 'ADD_COUPONS',
					payload: false
				});
			}
		});
	};
	//placeOrder
	const placeOrder = (e) => {
		e.preventDefault();
		history.push('/shop/payment');
	};

	//placeOrderCash
	const placeOrderCash = async () => {
		await createOrderCash(cash, couponTrueOrFalse, user.token).then((res) => {
			console.log('cash on delivery', res);
			if(res.data.ok){
				//remove from localStorage
				if (typeof window !== 'undefined') {
					localStorage.removeItem('cart');
				}
				// redux remove
				dispatch({
					type: 'ADD_TO_CART',
					payload: []
				});
				dispatch({
					type: 'ADD_COUPONS',
					payload: false
				});
				dispatch({
					type: 'PAY_CASH',
					payload: false
				});
				// remove from cart
				emtyCart(user.token)
				//history push redirect
				setTimeout(
					() => {
						history.push('/user/history');
					},
					[ 1000 ]
				);

			}
		});
	};
	return (
		<div className="row">
			<div className="col-md-6  pl-5 pr-5">
				<h4>Delivery Address</h4>
				<br />
				<br />
				<ReactQuill theme="snow" value={adress} onChange={setAdress} />
				<button className="btn btn-primary mt-2" onClick={saveAddressToDb}>
					Save
				</button>
				<hr />
				<h4>Got Coupon?</h4>
				<br />
				<form className="form-group">
					<input
						type="text"
						value={coupon}
						className="form-control"
						placeholder="name"
						onChange={DiscountAmountChanged}
					/>
					<button className="btn btn-primary mt-2" onClick={applyDiscount}>
						Apply
					</button>
					{totaDiscountError && <p className="bg-danger p-2">{totaDiscountError}</p>}
				</form>
			</div>

			<div className="col-md-5 pl-5 pr-5">
				<h4>Order Summary</h4>
				<hr />
				<p>Products {product.length}</p>
				<hr />
				<p>List of products:</p>
				{product.map((product, index) => (
					<b key={index}>
						<div className="p-1">
							{product.product.title} - {product.color} = {product.price * product.count}$
						</div>
					</b>
				))}
				<hr />
				<b>Cart Total: ${cartTotal}</b>
				<br />
				{totaDiscount > 0 && (
					<div>
						<p className="bg-success p-3"> Price with Coupon: ${totaDiscount} </p>
					</div>
				)}
				<hr />
				<div className="row">
					<div className="col-md-6">
						{cash ? (
							<button
								className="btn btn-primary"
								disabled={!saveAdress || !product.length}
								onClick={placeOrderCash}
							>
								Place Order
							</button>
						) : (
							<button
								className="btn btn-primary"
								disabled={!saveAdress || !product.length}
								onClick={placeOrder}
							>
								Place Order
							</button>
						)}
					</div>

					<div className="col-md-6" onClick={emptyCard}>
						<button className="btn btn-primary">Empty Cart</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Checkout;
