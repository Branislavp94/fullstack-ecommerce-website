import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getProductTotal, newProduct } from '../../functions/product';
import HomeProductCart from '../cards/HomeProductCart';
import LoadingSkeleton from '../cards/LoadingSkeleton';
import { Pagination } from 'antd';

function NajProdavanijiProizvodi() {
	const [ products, setProducts ] = useState([]);
	const [ loading, setLoading ] = useState(false);
	const [ productsTotal, setProductTotal ] = useState(0);
	const [ page, setPage ] = useState(1);

	useEffect(
		() => {
			loadProducts();
		},
		[ page ]
	);
	useEffect(() => {
		loadAllProducts();
	}, []);
	const loadAllProducts = async () => {
		await getProductTotal().then((res) => {
			setProductTotal(res.data);
		});
	};
	const loadProducts = async () => {
		await newProduct('sold', 'desc', page)
			.then((res) => {
				setLoading(true);
				setProducts(res.data);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<div>
			<div className="container">
				{loading ? (
					<LoadingSkeleton count={3} />
				) : (
					<div className="row">
						{products &&
							products.map((products, inedex) => (
								<div className="col-md-4" key={inedex}>
									<HomeProductCart products={products} />
								</div>
							))}
					</div>
				)}
			</div>
			<div className="row">
				<div className="col-md-4 text-center ml-auto mr-auto mt-4">
					<Pagination
						defaultCurrent={page}
						total={productsTotal / 3 * 10}
						onChange={(value) => setPage(value)}
					/>
				</div>
			</div>
		</div>
	);
}

export default NajProdavanijiProizvodi;
//
