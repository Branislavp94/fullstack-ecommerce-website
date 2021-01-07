import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { getAllProducts } from '../../../functions/product';
import ProductCart from './ProductCart';
function AllProducts() {
	const [ products, setProducts ] = useState([]);
	const [ loading, setLoading ] = useState(false);

	useEffect(() => {
		loadAllProducts();
	}, []);

	const loadAllProducts = async () => {
		await getAllProducts(100).then((Response) => {
			setLoading(true);
			setProducts(Response.data);
		});
	};
	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>
				<div className="col">
					All Products
					<div className="row">
						{products &&
							products.map((products, index) => (
								<div className="col-md-4 p-3" key={index}>
									<ProductCart products={products} loadAllProducts={loadAllProducts} />
								</div>
							))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default AllProducts;
