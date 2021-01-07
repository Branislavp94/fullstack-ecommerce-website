import React from 'react';
import { Card, Tooltip } from 'antd';
import noImage from '../../../../client/src/images/no_image_available.jpeg';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const { Meta } = Card;

function HomeProductCart({ products }) {
	//Tooltip
	const [ tooltip, setTooltip ] = useState('Dodajte u Korpu');
	//redux
	const dispatch = useDispatch();
	const { user, cart } = useSelector((state) => ({ ...state }));
	const LocalStorageHandler = () => {
		let cart = [];
		if (typeof window !== 'undefined') {
			localStorage.getItem('cart');
		}
		if (localStorage.getItem('cart')) {
			cart = JSON.parse(localStorage.getItem('cart'));
		}
		cart.push({
			...products,
			count: 1
		});
		// remove duplicate
		const unigue = _.uniqWith(cart, _.isEqual);
		// set localstorage

		localStorage.setItem('cart', JSON.stringify(unigue));
		setTooltip('Dodato');
		dispatch({
			type: 'ADD_TO_CART',
			payload: unigue
		});
		dispatch({
			type: 'SHOW_DRAWER',
			payload: true
		});
	};
	const { images, title, description, price } = products;
	return (
		<div>
			<Card
				className="mr-auto ml-auto"
				style={{ width: 300 }}
				cover={
					<img
						alt="example"
						src={images && images.length ? images[0].url : noImage}
						style={{ width: '300px', height: '200px' }}
					/>
				}
				actions={[
					<Link to={`/home/product/${products.slug}`}>
						<EyeOutlined className="text-warning" />
						<p>View Product</p>
					</Link>,

					<Tooltip title={tooltip}>
						<a onClick={LocalStorageHandler}>
							<ShoppingCartOutlined className="text-success" onClick={LocalStorageHandler} />
							<p>Add to card</p>
						</a>
					</Tooltip>
				]}
			>
				<Meta
					title={`${title} - $${price}`}
					description={`${description && description.substring(0, 40)}....`}
				/>
			</Card>,
		</div>
	);
}

export default HomeProductCart;
