import React from 'react';
import ModalImage from 'react-modal-image';
import noImg from '../../images/no_image_available.jpeg';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { CheckCircleOutlined, CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';

const ProductCardInCheckout = ({ p }) => {
	const colors = [ 'Black', 'Brown', 'Silver', 'White', 'Blue' ];
	let dispatch = useDispatch();

	const handleColorChange = (e) => {
		let cart = [];
		if (typeof window !== 'undefined') {
			if (localStorage.getItem('cart')) {
				cart = JSON.parse(localStorage.getItem('cart'));
			}

			cart.map((products, i) => {
				if (products._id === p._id) {
					cart[i].color = e.target.value;
				}
			});

			localStorage.setItem('cart', JSON.stringify(cart));
			dispatch({
				type: 'ADD_TO_CART',
				payload: cart
			});
		}
	};

	const handleQuantityChange = (e) => {
		// console.log("available quantity", p.quantity);
		let count = e.target.value < 1 ? 1 : e.target.value;

		if (count > p.quantity) {
			toast.error(`Max available product in Store`);
			return;
		}

		let cart = [];

		if (typeof window !== 'undefined') {
			if (localStorage.getItem('cart')) {
				cart = JSON.parse(localStorage.getItem('cart'));
			}

			cart.map((product, i) => {
				if (product._id === p._id) {
					cart[i].count = count;
				}
			});

			localStorage.setItem('cart', JSON.stringify(cart));
			dispatch({
				type: 'ADD_TO_CART',
				payload: cart
			});
		}
	};

	const handleRemove = () => {
		// console.log(p._id, "to remove");
		let cart = [];

		if (typeof window !== 'undefined') {
			if (localStorage.getItem('cart')) {
				cart = JSON.parse(localStorage.getItem('cart'));
			}
			// [1,2,3,4,5]
			cart.map((product, i) => {
				if (product._id === p._id) {
					cart.splice(i, 1);
				}
			});

			localStorage.setItem('cart', JSON.stringify(cart));
			dispatch({
				type: 'ADD_TO_CART',
				payload: cart
			});
		}
	};

	return (
		<tbody>
			<tr style={{ textAlign: 'center', verticalAlign: 'middle' }}>
				<td>
					<div style={{ width: '100px', height: 'auto' }}>
						{p.images.length ? (
							<ModalImage small={p.images[0].url} large={p.images[0].url} />
						) : (
							<ModalImage small={noImg} large={noImg} />
						)}
					</div>
				</td>
				<td>{p.title}</td>
				<td style={{ width: '100px' }}>${p.price}</td>
				<td style={{ width: '100px' }}>{p.brand}</td>
				<td style={{ width: '100px' }}>
					<select onChange={handleColorChange} name="color" className="form-control">
						{p.color ? <option value={p.color}>{p.color}</option> : <option>Select</option>}
						{colors.filter((c) => c !== p.color).map((c) => (
							<option key={c} value={c}>
								{c}
							</option>
						))}
					</select>
				</td>
				<td className="text-center" style={{ width: '100px' }}>
					<input type="number" className="form-control" value={p.count} onChange={handleQuantityChange} />
				</td>
				<td className="text-center">
					{p.shipping === 'Yes' ? (
						<CheckCircleOutlined className="text-success" />
					) : (
						<CloseCircleOutlined className="text-danger" />
					)}
				</td>
				<td className="text-center">
					<CloseOutlined onClick={handleRemove} className="text-danger pointer" />
				</td>
			</tr>
		</tbody>
	);
};

export default ProductCardInCheckout;
