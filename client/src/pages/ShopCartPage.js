import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { userCart } from '../../src/functions/user';
import ProductCardInCheckout from '../components/cards/ProductCardInCheckout';

const ShopCartPage = () => {
	const { cart, user } = useSelector((state) => ({ ...state }));
	const dispatch = useDispatch();
	const history = useHistory();
	const getTotal = () => {
		return cart.reduce((currentValue, nextValue) => {
			return currentValue + nextValue.count * nextValue.price;
		}, 0);
	};

	const saveOrderToDb = async () => {
		await userCart(cart, user.token)
			.then((res) => {
				if (res.data.ok) {
					history.push('/shop/checkout');
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const saveOrderToDbCashDelivery = async () => {
		dispatch({
			type: "PAY_CASH" ,
			payload: true
		})
		await userCart(cart, user.token)
		.then((res) => {
			if (res.data.ok) {
					history.push('/shop/checkout');
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
	

	const showCartItems = () => (
		<table className=" table table-responsive table-bordered">
			<thead className="thead-light">
				<tr>
					<th scope="col">Image</th>
					<th scope="col">Title</th>
					<th scope="col">Price</th>
					<th scope="col">Brand</th>
					<th scope="col">Color</th>
					<th scope="col">Count</th>
					<th scope="col">Shipping</th>
					<th scope="col">Remove</th>
				</tr>
			</thead>

			{cart.map((p) => <ProductCardInCheckout key={p._id} p={p} />)}
		</table>
	);

	return (
		<div className="container-fluid pt-2 m-auto">
			<div className="row">
				<div className="col-md-9 ">
					<h4>Cart / {cart.length} Product</h4>

					{!cart.length ? (
						<p>
							No products in cart. <Link to="/shop">Continue Shopping.</Link>
						</p>
					) : (
						showCartItems()
					)}
				</div>
				<div className="col-md-3 border">
					<h4>Order Summary</h4>
					<hr />
					<p>Products:</p>
					{cart.map((c, i) => (
						<div key={i}>
							<b>
								{c.title} x {c.count} = ${c.price * c.count}
							</b>
						</div>
					))}
					<hr />
					Total: <b>${getTotal()}</b>
					<hr />
					{user ? (
						<>
						<button onClick={saveOrderToDb} className="btn btn-sm btn-primary mt-2" disabled={!cart.length}>
							Process to Checkout
						</button><br></br>
						<button onClick={saveOrderToDbCashDelivery} className="btn btn-sm btn-warning mt-2" disabled={!cart.length}>
							Pay on delivery with Cash
						</button>
						</>
					) : (
						<button className="btn btn-sm btn-primary mt-2">
							<Link
								to={{
									pathname: '/login',
									state: { from: 'cart' }
								}}
							>
								Login to Checkout
							</Link>
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default ShopCartPage;
