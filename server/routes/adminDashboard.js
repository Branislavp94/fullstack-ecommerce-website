const express = require('express');
const router = express.Router();
const { getOrders, updateOrders } = require('../controllers/adminDashboard');

const { adminCheck, authCheck } = require('../middlewares/auth');

router.get('/admin/getOrders', getOrders);
router.put('/admin/updateOrders', authCheck, adminCheck, updateOrders);

module.exports = router;
