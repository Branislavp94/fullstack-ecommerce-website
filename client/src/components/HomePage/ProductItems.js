import React from 'react';
import { Link } from 'react-router-dom';
function ProductItems({ products }) {
	const { price, category, brand, slug, subs, color, quantity, shipping } = products;
	return (
		<div>
			<ul className="list-group">
				<li className="list-group-item">
					Price{''}
					<span className="label label-default pull-xs-right">${price}</span>
				</li>
				{category && (
					<Link to={`/category/${slug}`}>
						<li className="list-group-item">
							Category{''}
							<span className="label label-default pull-xs-right">{category.name}</span>
						</li>
					</Link>
				)}

				{subs && (
					<li className="list-group-item">
						Subs Categories
						{subs.map((s) => (
							<Link
								to={`/subs/${s.slug}`}
								key={s._id}
								className="label label-default label-pill pull-xs-right"
							>
								{s.name}
							</Link>
						))}
					</li>
				)}

				<li className="list-group-item">
					Color{''}
					<span className="label label-default pull-xs-right">{color}</span>
				</li>
				<li className="list-group-item">
					Brand{''}
					<span className="label label-default pull-xs-right">{brand}</span>
				</li>
				<li className="list-group-item">
					Avalible{''}
					<span className="label label-default pull-xs-right">{quantity}</span>
				</li>
				<li className="list-group-item">
					Shipping{''}
					<span className="label label-default pull-xs-right">{shipping}</span>
				</li>
			</ul>
		</div>
	);
}

export default ProductItems;
