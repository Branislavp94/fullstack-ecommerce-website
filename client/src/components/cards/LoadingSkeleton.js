import React from 'react';
import { Card, Skeleton } from 'antd';

function LoadingSkeleton({ count }) {
	const card = () => {
		let totalCard = [];
		for (let i = 0; i < count; i++) {
			totalCard.push(
				<Card className="col-md-4 " key={i}>
					<Skeleton active />
				</Card>
			);
		}
		return totalCard;
	};
	return <div className="row pb-5">{card()}</div>;
}

export default LoadingSkeleton;
