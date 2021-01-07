import React from 'react';

const ShowPaymentInfo = ({ order }) => (
	<div>
		<p>
			<b>Order Id: {order._id}</b> <br />
			<b>
				Amount:
				{(order.paymentIntent.amount / 100).toLocaleString('en-US', {
					style: 'currency',
					currency: 'USD'
				})}
			</b>
			<br />
			<b>Currency: {order.paymentIntent.currency.toUpperCase()}</b> <br />
			<b>Method: {order.paymentIntent.payment_method_types[0]}</b> <br />
			<b>Payment: {order.paymentIntent.status.toUpperCase()}</b> <br />
			<b>
				Orderd on:
				{new Date(order.paymentIntent.created * 1000).toLocaleString()}
			</b>
			<br />
			<b className="">
				Orderd Status:
				<span className="bg-blue ml-2">{order.orderStatus}</span>
			</b>
			<br />
		</p>
	</div>
);

export default ShowPaymentInfo;
