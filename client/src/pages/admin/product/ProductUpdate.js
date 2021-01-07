import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getProduct, updateProduct } from '../../../functions/product';
import { getCategories, getCategorySubs } from '../../../functions/category';
import FileUpload from '../../../components/forms/FileUpload';
import { LoadingOutlined } from '@ant-design/icons';
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm';
import { Avatar, Badge } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const initialState = {
	title: '',
	description: '',
	price: '',
	category: '',
	subs: [],
	shipping: '',
	quantity: '',
	images: [],
	colors: [ 'Black', 'Brown', 'Silver', 'White', 'Blue' ],
	brands: [ 'Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS' ],
	color: '',
	brand: ''
};

const ProductUpdate = ({ match }) => {
	// state
	const [ values, setValues ] = useState(initialState);
	const [ categories, setCategories ] = useState([]);
	const [ subOptions, setSubOptions ] = useState('');
	const [ arrayOfSubs, setArrayOfSubs ] = useState([]);
	const [ selectedCategory, setSelectedCategory ] = useState('');
	const [ loading, setLoading ] = useState(false);
	const history = useHistory();

	const { user } = useSelector((state) => ({ ...state }));
	// router
	const { slug } = match.params;

	useEffect(() => {
		loadProduct();
		loadCategory();
	}, []);

	const loadProduct = () => {
		getProduct(slug).then((p) => {
			setValues({ ...values, ...p.data });
			console.log(p);
			getCategorySubs(p.data.category._id).then((res) => {
				setSubOptions(res.data);
			});
			let arr = [];
			p.data.subs.map((s) => {
				arr.push(s._id);
			});
			console.log('array of subs', arr);
			setArrayOfSubs(arr);
		});
	};
	const loadCategory = (e) => {
		getCategories().then((c) => {
			setCategories(c.data);
		});
	};
	const handleChange = (e) => {
		e.preventDefault();
		setValues({ ...values, [e.target.name]: e.target.value });
	};
	const handleCatagoryChange = (e) => {
		e.preventDefault();
		setValues({ ...values, subs: [] });
		setSelectedCategory(e.target.value);
		getCategorySubs(e.target.value).then((result) => {
			setSubOptions(result.data);
		});
		if (values.category._id === e.target.value) {
			loadProduct();
		}
		setArrayOfSubs([]);
	};
	const deleteImage = async (public_id) => {
		await axios
			.post(
				'http://localhost:9000/api/removeimage',
				{ public_id },
				{
					headers: {
						authtoken: user ? user.token : ''
					}
				}
			)
			.then((res) => {
				console.log(res);
				setLoading(false);
				const { images } = values;
				let imageFilter = images.filter((item) => {
					return item.public_id !== public_id;
				});
				setValues({ ...values, images: imageFilter });
			})
			.catch((error) => {
				console.log(error);
			});
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		values.subs = arrayOfSubs;
		values.category = selectedCategory ? selectedCategory : values.category;
		await updateProduct(slug, values, user.token)
			.then((res) => {
				setLoading(false);
				console.log(res);
				toast.success(`${res.data.slug} is updated`);
				history.push('/admin/products');
			})
			.catch((error) => {
				setLoading(false);
				console.log(error);
				toast.error(error.message);
			});
	};
	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>
				<div className="col-md-10">
					{loading ? <LoadingOutlined className="text-danger h1" /> : <h4>Product update</h4>}
					<hr />

					<span className="avatar-item">
						{values.images &&
							values.images.map((image) => (
								<Badge
									count="x"
									onClick={() => deleteImage(image.public_id)}
									style={{ cursor: 'pointer' }}
									key={image.public_id}
								>
									<Avatar
										shape="square"
										icon={<UserOutlined />}
										size={100}
										src={image.url}
										className="m-2"
									/>
								</Badge>
							))}
					</span>
					<div className="p-3">
						<FileUpload values={values} setValues={setValues} setLoading={setLoading} />
					</div>
					<ProductUpdateForm
						handleSubmit={handleSubmit}
						handleChange={handleChange}
						values={values}
						setValues={setValues}
						categories={categories}
						handleCatagoryChange={handleCatagoryChange}
						subOptions={subOptions}
						arrayOfSubs={arrayOfSubs}
						setArrayOfSubs={setArrayOfSubs}
						selectedCategory={selectedCategory}
					/>
					<hr />
				</div>
			</div>
		</div>
	);
};

export default ProductUpdate;
