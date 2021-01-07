import React from 'react';
import { Card, Avatar } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import noImage from '../../../../../client/src/images/no_image_available.jpeg';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { removeProduct } from '../../../functions/product';
import { Link } from 'react-router-dom';

const { Meta } = Card;

function ProductCart({ products, loadAllProducts }) {
	const { images, title, description } = products;
	const { user } = useSelector((state) => ({ ...state }));
	const deleteProduct = async (slug) => {
		try {
			if (window.confirm('Do you want to delete?')) {
				await removeProduct(slug, user.token).then((res) => {
					console.log(res);
					loadAllProducts();
					toast.success(`Succsess deleted product`);
				});
			}
		} catch (error) {
			toast.error(error.message);
			console.log(error);
		}
	};
	return (
		<div className="p-3">
			<Card
				style={{ width: 300 }}
				cover={
					<img
						alt="example"
						src={images && images.length ? images[0].url : noImage}
						style={{ width: '300px', height: '200px' }}
					/>
				}
				actions={[
					<DeleteOutlined
						className="text-warning"
						onClick={() => {
							deleteProduct(products.slug);
						}}
					/>,
					<Link to={`/admin/product/${products.slug}`}>
						<EditOutlined className="text-danger" />
					</Link>
				]}
			>
				<Meta title={title} description={`${description && description.substring(0, 40)}...`} />
			</Card>,
		</div>
	);
}

export default ProductCart;
