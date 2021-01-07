const express = require('express');
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

// controller
const { create, remove, list } = require('../controllers/coupons');

// routes
router.post('/coupons', authCheck, adminCheck, create);
router.get('/coupons', list);
router.delete('/coupons/:_id', authCheck, adminCheck, remove);

module.exports = router;
