import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSub } from '../../functions/sub';
import HomeProductCart from '../cards/HomeProductCart';

function ViewProductSubs() {
	const [ subs, setSubs ] = useState([]);
    const [ product, setProduct ] = useState([]);
    console.log(product)
	const { slug } = useParams();

	useEffect(() => {
		getSub(slug).then((s) => {
			setSubs(s.data);
			setProduct(s.data.product);
		});
	}, []);

	return (
		<div>
			<div className="jumbotron  jumbotron-fluid h1 text-center font-weight-bold  ml-auto mr-auto align-items-center display-4">
				{`There is ${product.length} product in ${ subs.sub?.name} sub Category`}
			</div>

			<div className="container">
				<div className="row">
					{product &&
						product.map((p , index) => (
							<div className="col-md-4" key={index}>
								<HomeProductCart products={p} />
							</div>
						))}
				</div>
			</div>
		</div>
	);
}

export default ViewProductSubs;
