import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import HomeProductCart from '../cards/HomeProductCart';
import { getCategory } from '../../../../client/src/functions/category.js';

function ViewProductCategory() {
	const [ Category, setCategory ] = useState([]);
	const [ product, setProduct ] = useState([]);
	const { slug } = useParams();

	useEffect(() => {
		getCategory(slug).then((c) => {
			setCategory(c.data);
			setProduct(c.data.product);
		});
	}, []);

	return (
		<div>
			<div className="jumbotron  jumbotron-fluid h1 text-center font-weight-bold  ml-auto mr-auto align-items-center display-4">
				{`There is ${product.length} product in ${Category.category?.name} category`}
			</div>			

			<div className="container">
				<div className="row">{product && product.map((p,index)=>(
					<div className="col-md-4" key={index}>
						<HomeProductCart products={p}/>
					</div>
				))}</div>
			</div>
		</div>
	);
}

export default ViewProductCategory;
