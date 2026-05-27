const express = require('express');
const router = express.Router();
const jobController = require('../controllers/job.controller');
const { protect, restrictTo } = require('../middleware/auth');

// ✅ Admin routes pehle
router.get('/admin/list', protect, restrictTo('admin', 'super_admin'), jobController.getAllJobsAdmin);

// Public routes
router.get('/', jobController.getAllJobs);
router.get('/:id', jobController.getJobById);

// Admin CRUD
router.post('/', protect, restrictTo('admin', 'super_admin'), jobController.createJob);
router.put('/:id', protect, restrictTo('admin', 'super_admin'), jobController.updateJob);
router.delete('/:id', protect, restrictTo('admin', 'super_admin'), jobController.deleteJob);

module.exports = router;