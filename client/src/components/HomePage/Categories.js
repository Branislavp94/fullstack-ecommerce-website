import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getCategories } from '../../functions/category';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function Categories() {
	const [ categories, setCategories ] = useState([]);
	const { slug } = useParams();

	useEffect(() => {
		getCategories().then((res) => {
			setCategories(res.data);
		});
	}, []);
	return (
		<div>
			<div className="container">
				<div className="row">
					{categories.length ? (
						categories.map((c, index) => (
							<Link
								to={`/category/${c.slug}`}
								className="row  btn btn-outline-primary m-2 col-md-5 ml-auto mr-auto p-1"
								key={index}
							>
								<button className="btn">{c.name}</button>
							</Link>
						))
					) : (
						<div className="h1 m-auto">No categories</div>
					)}
				</div>
			</div>
			<div />
		</div>
	);
}

export default Categories;
