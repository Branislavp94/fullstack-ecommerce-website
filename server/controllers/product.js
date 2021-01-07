const Product = require('../models/product');
const slugify = require('slugify');

exports.create = async (req, res) => {
	try {
		req.body.slug = slugify(req.body.title);
		const newProduct = await new Product(req.body).save();
		res.json(newProduct);
	} catch (err) {
		console.log(err);
		// res.status(400).send("Create product failed");
		res.status(400).json({
			err: err.message
		});
	}
};

exports.readaAll = async (req, res) => {
	let products = await Product.find({})
		.limit(parseInt(req.params.count))
		.populate('Category')
		.populate('Sub')
		.sort([ [ 'createdAt', 'desc' ] ])
		.exec();
	res.json(products);
};
exports.remove = async (req, res) => {
	try {
		const productDelete = await Product.findOneAndRemove({ slug: req.params.slug }).exec();
		res.json(productDelete);
	} catch (error) {
		console.log(error);
		res.status(400).send('Delete product Failed');
	}
};
exports.update = async (req, res) => {
	try {
		const updateProduct = await Product.findOneAndUpdate({ slug: req.params.slug }, req.body, { new: true }).exec();
		res.status(200).json(updateProduct);
	} catch (error) {
		res.status(400).send('Please fill out all the input fields');
		console.log(error);
	}
};
exports.read = async (req, res) => {
	const product = await Product.findOne({ slug: req.params.slug }).populate('category').populate('subs').exec();
	res.json(product);
};
// Whitout PENIGRATION
// exports.newProduct = async (req, res) => {
// 	try {
// 		const { sort, order, limit } = req.body;
// 		const products = await Product.find({})
// 			.populate('category')
// 			.populate('subs')
// 			.sort([ [ sort, order ] ])
// 			.limit(limit)
// 			.exec();
// 		res.json(products);
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

// WITH PENIGRATION
exports.newProduct = async (req, res) => {
	try {
		const { sort, order, page } = req.body;

		const currentPage = page || 1;
		const perPage = 3;
		const products = await Product.find({})
			.skip((currentPage - 1) * perPage)
			.populate('category')
			.populate('subs')
			.sort([ [ sort, order ] ])
			.limit(perPage)
			.exec();
		res.json(products);
	} catch (error) {
		console.log(error);
	}
};

exports.totalCount = async (req, res) => {
	try {
		let productCount = await Product.find({}).estimatedDocumentCount().exec();
		res.json(productCount);
	} catch (error) {
		console.log(err);
	}
};

exports.relatedProduct = async (req, res) => {
	const product = await Product.findById(req.params.productId);

	const relatedProduct = await Product.find({
		_id: { $ne: product._id },
		category: product.category
	})
		.limit(3)
		.populate('Category')
		.populate('Sub')
		.populate('postedBy')
		.exec();
	res.json(relatedProduct);
};

// search / Filter

const handleQuery = async (req, res, query) => {
	try {
		let handlequery = await Product.find({ $text: { $search: query } })
			.populate('Category', '_id name')
			.populate('subs', '_id name')
			.exec();
		res.json(handlequery);
	} catch (error) {
		console.log(error);
	}
};
//price hangle
const handlePrice = async (req, res, price) => {
	try {
		let priceHandle = await Product.find({
			price: {
				$gte: price[0],
				$lte: price[1]
			}
		})
			.populate('category', '_id name')
			.populate('subs', '_id name')
			.exec();
		res.json(priceHandle);
	} catch (error) {
		console.log(error);
	}
};
//categoryHandle

const handleCategory = async (req, res, category) => {
	try {
		let categoryProduct = await Product.find({ category })
			.populate('category', '_id name')
			.populate('subs', '_id name')
			.exec();
		res.json(categoryProduct);
	} catch (error) {
		console.log(error);
	}
};
// handleSubs
const handleSubs = async (req, res, sub) => {
	try {
		let subsProduct = await Product.find({ subs: sub }).populate('category').populate('sub').exec();
		res.json(subsProduct);
	} catch (error) {
		console.log(error);
	}
};
//handleBrand
const handleBrand = async (req, res, brand) => {
	try {
		const brandProduct = await Product.find({ brand }).populate('category').populate('sub').exec();
		res.json(brandProduct);
	} catch (error) {
		console.log(error);
	}
};
// handleColor
const handleColor = async (req, res, color) => {
	try {
		const colorProduct = await Product.find({ color }).populate('category').populate('sub').exec();
		res.json(colorProduct);
	} catch (error) {
		console.log(error);
	}
};
//handleShipping

const handleShipping = async (req, res, shipping) => {
	try {
		const shippingProduct = await Product.find({ shipping }).populate('category').populate('sub').exec();
		res.json(shippingProduct);
	} catch (error) {
		console.log(error);
	}
};
exports.searchFilter = async (req, res) => {
	try {
		const { query, price, category, sub, brand, color, shipping } = req.body;
		if (query) {
			console.log('query', query);
			await handleQuery(req, res, query);
		}

		if (price !== undefined) {
			console.log('price', price);
			await handlePrice(req, res, price);
		}
		if (category) {
			console.log('category', category);
			await handleCategory(req, res, category);
		}
		if (sub) {
			console.log('subs', sub);
			await handleSubs(req, res, sub);
		}
		if (brand) {
			console.log('brand', brand);
			await handleBrand(req, res, brand);
		}
		if (color) {
			console.log('color', color);
			await handleColor(req, res, color);
		}
		if (shipping) {
			console.log('shipping', shipping);
			await handleShipping(req, res, shipping);
		}
	} catch (error) {
		console.log(error);
	}
};
