const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');
const { protect, restrictTo } = require('../middleware/auth');

router.use(protect);
router.use(restrictTo('admin', 'super_admin'));

router.get('/stats', dashboardController.getDashboardStats);
router.get('/charts', dashboardController.getChartData);
router.get('/recent-activities', dashboardController.getRecentActivities);

module.exports = router;