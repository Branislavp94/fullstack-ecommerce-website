import React, { useState } from 'react';
import { useEffect } from 'react';
import HomeProductCart from '../components/cards/HomeProductCart';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, searchFilterProduct } from '../functions/product';
import { Menu, Slider, Checkbox, Radio } from 'antd';
import { DollarOutlined, DownSquareOutlined } from '@ant-design/icons';
import { getCategories } from '../functions/category';
import { getSubs } from '../functions/sub';

function ShopPage() {
	const { SubMenu, ItemGroup } = Menu;
	const [ loading, setLoading ] = useState(false);
	const [ product, setProduct ] = useState([]);
	const [ category, setCategory ] = useState([]);
	const [ categoryIds, setCategoryIds ] = useState([]);
	const [ subs, setSubs ] = useState([]);
	const [ sub, setSub ] = useState([]);
	const [ price, setPrice ] = useState([ 0, 0 ]);
	const { search } = useSelector((state) => ({ ...state }));
	const [ ok, setOk ] = useState('');
	const [ brands, setBrands ] = useState([ 'Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS' ]);
	const [ colors, setColors ] = useState([ 'Black', 'Brown', 'Silver', 'White', 'Blue' ]);
	const [ shipping, setShipping ] = useState([ 'Yes', 'No' ]);
	const [ shipp, setShipp ] = useState([]);
	const [ color, setColor ] = useState([]);
	const [ brand, setBrand ] = useState([]);

	const dispatch = useDispatch();
	const { text } = search;
	// search filter
	const searchFilter = async (arg) => {
		searchFilterProduct(arg).then((res) => {
			setProduct(res.data);
		});
	};
	useEffect(() => {
		productByCount();
		getCategories().then((res) => {
			setCategory(res.data);
		});
		getSubs().then((res) => {
			setSubs(res.data);
		});
	}, []);
	// default
	const productByCount = () => {
		getAllProducts(12).then((res) => {
			setLoading(true);
			setProduct(res.data);
			setLoading(false);
		});
	};
	useEffect(
		() => {
			productByCount();
			const delay = setTimeout(() => {
				searchFilter({ query: text });
			}, 500);
			return () => clearTimeout(delay);
		},
		[ text ]
	);

	//price filter
	const priceChange = (value) => {
		dispatch({
			type: 'SEARCH_QUERY',
			payload: { text: '' }
		});
		setCategoryIds([]);
		setSub([]);
		setBrand([]);
		setColor([]);
		setShipp([]);
		setTimeout(() => {
			setOk(!ok);
		}, 500);
		setPrice(value);
	};

	useEffect(
		() => {
			searchFilter({ price });
		},
		[ ok ]
	);

	// category  Handle functions

	const HandleCheck = (e) => {
		dispatch({
			type: 'SEARCH_QUERY',
			payload: { text: '' }
		});
		setPrice([ 0, 0 ]);
		setSub([]);
		setBrand([]);
		setColor([]);
		setShipp([]);
		let inTheStae = [ ...categoryIds ];
		let justCheck = e.target.value;
		let foundInTheStae = inTheStae.indexOf(justCheck);

		if (foundInTheStae === -1) {
			inTheStae.push(justCheck);
		} else {
			inTheStae.splice(foundInTheStae, 1);
		}
		setCategoryIds(inTheStae);
		console.log(inTheStae);

		searchFilter({ category: inTheStae });
	};

	//subsHandle

	const subsHandle = (sub) => {
		dispatch({
			type: 'SEARCH_QUERY',
			payload: { text: '' }
		});
		setPrice([ 0, 0 ]);
		setCategoryIds([]);
		setBrand([]);
		setColor([]);
		setShipp([]);
		setSub(sub);
		searchFilter({ sub });
	};

	//HandleBrand
	const HandleBrand = (e) => {
		dispatch({
			type: 'SEARCH_QUERY',
			payload: { text: '' }
		});
		setPrice([ 0, 0 ]);
		setCategoryIds([]);
		setSub([]);
		setColor([]);
		setShipp([]);
		setBrand(e.target.value);
		searchFilter({ brand: e.target.value });
	};
	//HandleColors
	const HandleColors = (e) => {
		dispatch({
			type: 'SEARCH_QUERY',
			payload: { text: '' }
		});
		setPrice([ 0, 0 ]);
		setCategoryIds([]);
		setSub([]);
		setBrand([]);
		setShipp([]);
		setColor(e.target.value);
		searchFilter({ color: e.target.value });
	};
	//HandleShipping
	const HandleShipping = (e) => {
		setShipp(e.target.value);
		dispatch({
			type: 'SEARCH_QUERY',
			payload: { text: '' }
		});
		setPrice([ 0, 0 ]);
		setCategoryIds([]);
		setSub([]);
		setBrand([]);
		setColor([]);
		searchFilter({ shipp: e.target.value });
	};
	return (
		<div>
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-3 border">
						<h1 style={{ borderBottom: '2px solid #E1E1E1' }}>Search / Filter</h1>
						<Menu mode="inline" className="mt-1" defaultOpenKeys={[ '1', '2', '3', '4', '5', '6' ]}>
							{/*  price filter */}
							<SubMenu
								key="1"
								title={
									<span className="h6">
										<DollarOutlined /> Price
									</span>
								}
							>
								<div>
									<Slider
										className="ml-4 mr-4"
										range
										defaultValue={price}
										tipFormatter={(v) => `$${v}`}
										value={price}
										max="1000"
										onChange={priceChange}
									/>
								</div>
							</SubMenu>
							<br />

							{/*  category */}

							<SubMenu
								key="2"
								title={
									<span className="h6">
										<DownSquareOutlined /> Category
									</span>
								}
							>
								<div style={{ marginTop: '-5px' }}>
									{category.map((c, index) => (
										<div key={index}>
											<Checkbox
												className="pb-2 pl-4 pr-4"
												value={c._id}
												onChange={HandleCheck}
												checked={categoryIds.includes(c._id)}
											>
												{c.name}
											</Checkbox>
										</div>
									))}
								</div>
							</SubMenu>
							<br />

							{/*  subs */}

							<SubMenu
								key="3"
								title={
									<span className="h6">
										<DownSquareOutlined /> Sub Category
									</span>
								}
							>
								<div style={{ marginTop: '-5px' }}>
									{subs &&
										subs.map((s, index) => (
											<div
												key={index}
												className=" p-2 m-1  badge badge-secondary"
												style={{ cursor: 'pointer' }}
												value={s._id}
												onClick={() => subsHandle(s)}
											>
												{s.name}
											</div>
										))}
								</div>
							</SubMenu>
							<br />

							{/* brand */}
							<SubMenu
								key="4"
								title={
									<span className="h6">
										<DownSquareOutlined /> Brand
									</span>
								}
							>
								<div style={{ marginTop: '-5px' }}>
									{brands &&
										brands.map((b, index) => (
											<div key={index}>
												<Radio
													className="pb-2 pl-4 pr-4"
													value={b}
													name={b}
													onChange={HandleBrand}
													checked={b === brand}
												>
													{b}
												</Radio>
											</div>
										))}
								</div>
							</SubMenu>
							<br />

							{/* color */}
							<SubMenu
								key="5"
								title={
									<span className="h6">
										<DownSquareOutlined /> Colors
									</span>
								}
							>
								<div style={{ marginTop: '-5px' }}>
									{colors &&
										colors.map((c, index) => (
											<div key={index}>
												<Radio
													className="pb-2 pl-4 pr-4"
													value={c}
													name={c}
													onChange={HandleColors}
													checked={c === color}
												>
													{c}
												</Radio>
											</div>
										))}
								</div>
							</SubMenu>
							<br />

							{/* shipping */}
							<SubMenu
								key="6"
								title={
									<span className="h6">
										<DownSquareOutlined /> Shipping
									</span>
								}
							>
								<div style={{ marginTop: '-5px' }}>
									{shipping &&
										shipping.map((s, index) => (
											<div key={index}>
												<Radio
													className="pb-2 pl-4 pr-4"
													value={s}
													name={s}
													onChange={HandleShipping}
													checked={s === shipp}
												>
													{s}
												</Radio>
											</div>
										))}
								</div>
							</SubMenu>
						</Menu>
						<br />
						<br />
					</div>
					<div className="col-md-9">
						{loading ? (
							<h4 className="text-danger">Loading ...</h4>
						) : (
							<h4 className="text-primary mt-2">Product</h4>
						)}
						{product.length < 1 && <p>No product found</p>}
						<div className="row pb-5">
							{product &&
								product.map((p, index) => (
									<div className="col-md-4 mt-4" key={index}>
										<HomeProductCart products={p} />
									</div>
								))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ShopPage;
