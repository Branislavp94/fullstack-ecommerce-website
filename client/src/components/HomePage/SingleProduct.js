import React from 'react';
import { Card, Avatar ,Tooltip} from 'antd';
import noImage from '../../../../client/src/images/no_image_available.jpeg';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import ProductItems from './ProductItems';
import _ from "lodash";
import {useDispatch , useSelector}  from "react-redux"
import { useState } from 'react';
import { addWishlist } from '../../functions/user';
import{toast} from "react-toastify"
const { Meta } = Card;
function SingleProduct({products}) {

	const {title, images} = products
	const dispatch = useDispatch()
	const [ tooltip, setTooltip ] = useState('Dodajte u Korpu');
	const {user} = useSelector((state)=>({...state}))

	const localStorageHandle = ()=>{
		  let cart = []
		  if (typeof window !== 'undefined'){
			  localStorage.getItem("cart")
		  }
		  	if(localStorage.getItem("cart")){
				  JSON.parse(localStorage.getItem("cart"))
			  }
			cart.push({
				...products,
				count :1
			})
			// remove duplicate 
			const unique = _.uniqWith(cart, _.isEqual)
			// localStorageSet
			localStorage.setItem("cart" , JSON.stringify(unique))
			//Tooltip
			setTooltip("Dodato")
			//save in redux
			dispatch({
				type: "ADD_TO_CART",
				payload: unique
			})
	}
	//addToWishlist
	const addToWishlist = (e)=>{
			e.preventDefault();
			addWishlist(user.token , products._id).then((res)=>{
				console.log(res)
				toast.success("Wishlist added successfully");
			})
	}
	return (
		<>
			<div className="col-md-6 ">
				{	images && images.length ?<Carousel showArrows={true} autoPlay={true} infiniteLoop={true} >
					{ images && images.map((i , index)=>(
						<div key={index}>
							 <img src={i.url} style={{height:"auto" , objectFit: "cover"}}></img>
						</div>
					))}
					</Carousel> :(
						<Card cover={
							<img
								alt="example"
								src={noImage}
								style={{height:"450px" , objectFit: "cover"}}
							/>
						}/>
					)}
			</div>
			<div className="col-md-5 ">	
			<h4 className="bg-info p-4">{title}</h4>
			<Card
				className="ml-auto mr-auto"
				actions={[
					<a onClick={addToWishlist}>
						<HeartOutlined  className="text-danger" />
						<p>Add to wishList</p>
					</a>,
						<Tooltip title={tooltip}>
						<a onClick = {localStorageHandle}>
						<ShoppingCartOutlined className="text-success" />
						<p>Add to card</p>
						</a>
						</Tooltip>
						
				]}
			>
			
				<ProductItems products={products}/>
			</Card>,</div>
		</>
	);
}

export default SingleProduct;
