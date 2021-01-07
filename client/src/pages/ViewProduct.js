import React, { useEffect, useState } from 'react';
import SingleProduct from '../components/HomePage/SingleProduct';
import { getProduct, relatedProduct } from '../functions/product';
import { useParams } from 'react-router-dom';
import HomeProductCart from '../components/cards/HomeProductCart';

function ViewProduct() {
	const [ products, setProducts ] = useState([]);
	const [ realetedProduct, setRealetedProduct ] = useState([]);
	console.log(realetedProduct);
	const { slug } = useParams();
	useEffect(
		() => {
			loadProduct();
		},
		[ slug ]
	);

	const loadProduct = async () => {
		await getProduct(slug).then((res) => {
			setProducts(res.data);
			relatedProduct(res.data._id).then((res) => {
				setRealetedProduct(res.data);
			});
		});
	};
	return (
		<div className="container-fluid">
			<div className="row pt-4">
				<SingleProduct products={products} />
			</div>
			<div className="h1  border text-center">Realeted Product</div>
			<div className="container">
				<div className="row col-mb-3 mt-5">
					{realetedProduct.length ? (
						realetedProduct.map((relatedP, index) => (
							<div className="col-md-4" key={index}>
								<HomeProductCart products={relatedP} />
							</div>
						))
					) : (
						<div className="h1 ml-auto mr-auto">No realeted Product</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default ViewProduct;
