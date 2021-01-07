import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import CouponForm from '../../../components/forms/CouponForm';
import { createCopunos, deleteCopunos, getAllCopunos } from '../../../functions/coupons';

const CouponsCreate = () => {
	const { user } = useSelector((state) => ({ ...state }));

	const [ name, setName ] = useState('');
	const [ discount, setDiscount ] = useState('');
	const [ expires, setExpires ] = useState('');

	const [ loading, setLoading ] = useState(false);
	const [ getAllcoupons, setGetAllcoupons ] = useState([]);
	console.log(getAllcoupons);

	useEffect(() => {
		loadCoupons();
	}, []);

	const loadCoupons = () => getAllCopunos().then((coupons) => setGetAllcoupons(coupons.data));

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		await createCopunos({ name, discount, expires }, user.token)
			.then((res) => {
				setLoading(false);
				setName('');
				setDiscount('');
				setExpires('');
				toast.success(`"${res.data.name}" is created`);
				loadCoupons();
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
				toast.error(err.message);
			});
	};

	const handleRemove = async (_id) => {
		setLoading(true);
		if (window.confirm('Are you sure you want to deleteCopunos')) {
			await deleteCopunos(_id, user.token)
				.then((res) => {
					console.log(res);
					setLoading(false);
					toast.success(`"${res.data.name}" is deleted`);
					loadCoupons();
				})
				.catch((err) => {
					console.log(err);
					toast.error(err.message);
				});
		}
	};

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>
				<div className="col-md-8">
					{loading ? <h4 className="text-danger">Loading..</h4> : <h4>Create Coupons</h4>}

					<CouponForm
						handleSubmit={handleSubmit}
						name={name}
						setName={setName}
						discount={discount}
						setDiscount={setDiscount}
						expires={expires}
						setExpires={setExpires}
					/>

					<table className="table  table-bordered text-center">
						<thead className="thead-light">
							<tr>
								<th scope="col">Name</th>
								<th scope="col">Discount %</th>
								<th scope="col">Expires Date</th>
								<th scope="col">Delete Coupon</th>
							</tr>
						</thead>
						<tbody className="text-center">
							{getAllcoupons &&
								getAllcoupons.map((c, index) => (
									<tr key={index}>
										<td>{c.name}</td>
										<td>{c.discount}%</td>
										<td>{new Date(c.expires).toLocaleDateString()}</td>
										<td>
											<DeleteOutlined
												onClick={() => handleRemove(c._id)}
												className="text-danger"
											/>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default CouponsCreate;
