import React, { useEffect } from 'react';
import { useState } from 'react';
import { RemoveWishlist, wishlist } from '../../functions/user';
import { useSelector } from 'react-redux';
import { DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserNav from '../../../../client/src/components/nav/UserNav';
function Wishlist() {
	const [ loading, setLoading ] = useState(false);
	const [ Wishlist, setWishlist ] = useState([]);
	const { user } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		allWishlists();
	}, []);

	const allWishlists = () => {
		wishlist(user.token).then((res) => {
			console.log(res);
			setLoading(true);
			setWishlist(res.data.wishlist);
			setLoading(false);
		});
	};
	const handleRemove = async (productId) => {
		if (window.confirm('Are you sure you want to remove this product')) {
			setLoading(true);
			await RemoveWishlist(productId, user.token).then((res) => {
				console.log(res);
				setLoading(false);
				toast.success(`Succsessfuly deletet`);
				allWishlists();
			});
		}
	};
	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<UserNav />
				</div>
				<div className="col">
					{loading ? <h4 className="text-danger">Loading..</h4> : <h4>Wishlist </h4>}
					{Wishlist &&
						Wishlist.map((p, index) => (
							<div className="alert alert-secondary" key={index}>
								<Link to={`/home/product/${p.slug}`}>{p.title}</Link>
								<span onClick={() => handleRemove(p._id)} className="btn btn-sm float-right">
									<DeleteOutlined className="text-danger" />
								</span>
							</div>
						))}
				</div>
			</div>
		</div>
	);
}

export default Wishlist;
