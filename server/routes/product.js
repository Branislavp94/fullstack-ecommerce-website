const express = require('express');
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

// controller
const {
	create,
	readaAll,
	remove,
	update,
	read,
	newProduct,
	totalCount,
	relatedProduct,
	searchFilter
} = require('../controllers/product');

// routes
router.post('/product', authCheck, adminCheck, create);
// total product
router.get('/products/total', totalCount);
router.get('/products/:count', readaAll);
router.delete('/product/:slug', authCheck, adminCheck, remove);
router.put('/product/:slug', authCheck, adminCheck, update);
router.get('/product/:slug', read);
router.post('/products', newProduct);
// related product
router.get('/product/related/:productId', relatedProduct);

//search
router.post('/search/filters', searchFilter);

module.exports = router;
