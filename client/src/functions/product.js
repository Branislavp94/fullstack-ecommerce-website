import axios from 'axios';

export const createProduct = async (product, authtoken) =>
	await axios.post(`${process.env.REACT_APP_API}/product`, product, {
		headers: {
			authtoken
		}
	});

export const getAllProducts = async (count) => await axios.get(`${process.env.REACT_APP_API}/products/${count}`);

export const removeProduct = async (slug, authtoken) =>
	await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
		headers: {
			authtoken
		}
	});

export const getProduct = async (slug) => await axios.get(`${process.env.REACT_APP_API}/product/${slug}`);

export const updateProduct = async (slug, updateProduct, authtoken) =>
	await axios.put(`${process.env.REACT_APP_API}/product/${slug}`, updateProduct, {
		headers: {
			authtoken: authtoken
		}
	});

export const newProduct = async (sort, order, page) =>
	await axios.post(`${process.env.REACT_APP_API}/products`, {
		sort,
		order,
		page
	});

export const getProductTotal = async () => await axios.get(`${process.env.REACT_APP_API}/products/total`);

export const relatedProduct = async (productId) =>
	await axios.get(`${process.env.REACT_APP_API}/product/related/${productId}`);

export const searchFilterProduct = async (arg) => await axios.post(`${process.env.REACT_APP_API}/search/filters`, arg);
