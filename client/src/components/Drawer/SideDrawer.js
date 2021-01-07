import React from 'react';
import { Drawer, Button } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import noImage from '../../../../client/src/images/no_image_available.jpeg';
function SideDrawer({ children }) {
	const { cart, drawer } = useSelector((state) => ({ ...state }));
	const dispatch = useDispatch();
	const onClose = () => {
		dispatch({
			type: 'SHOW_DRAWER',
			payload: false
		});
	};
	const imageStyle = {
		width: '100%',
		height: '120px',
		objectFit: 'cover'
	};
	return (
		<div>
			<Drawer visible={drawer} onClose={onClose} title={`Cart / ${cart.length} Products`}>
				{cart &&
					cart.map((cart, index) => (
						<div className="row" key={index}>
							<div className="col">
								{cart.images[0] ? (
									<>
									<img src={cart.images[0].url} style={imageStyle} />
									<p className="text-center bg-secondary text-light" > {cart.title} x {cart.count}</p>
									</>
								) : (
									<>
									<img src={noImage} style={imageStyle} />
									<p className="text-center">{cart.title} x {cart.count}</p>
									</>
								)}
							</div>
						</div>
					))}
					<Link to = "/shop/cart" className="mt-2" onClick = {onClose}>
						<button className="text-center btn btn-primary btn-raised btn-block">Add to cart</button>
						
					</Link>
			</Drawer>
		</div>
	);
}

export default SideDrawer;
