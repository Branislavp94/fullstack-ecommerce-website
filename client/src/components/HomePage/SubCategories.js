import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getSubs } from '../../functions/sub';

function SubCategories() {
	const [ subs, setSubs ] = useState([]);

	useEffect(() => {
		getSubs().then((res) => {
			setSubs(res.data);
		});
	}, []);
	return (
		<div>
			<div className="container">
				<div className="row">
					{subs.length ? (
						subs.map((s, index) => (
							<Link
								to={`/subs/${s.slug}`}
								className="row  btn btn-outline-primary m-2 col-md-5 ml-auto mr-auto p-1"
								key={index}
							>
								<button className="btn">{s.name}</button>
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

export default SubCategories;
