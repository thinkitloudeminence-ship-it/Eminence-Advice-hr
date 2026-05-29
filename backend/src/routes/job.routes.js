const express = require('express');
const router = express.Router();
const jobController = require('../controllers/job.controller');
const { protect, restrictTo } = require('../middleware/auth');

// Public routes
router.get('/', jobController.getAllJobs);
router.get('/slug/:slug', jobController.getJobBySlug);  // ✅ New: get by slug
router.get('/:id', jobController.getJobById);           // Keep for backward compatibility

// Admin routes
router.get('/admin/list', protect, restrictTo('admin', 'super_admin'), jobController.getAllJobsAdmin);
router.post('/', protect, restrictTo('admin', 'super_admin'), jobController.createJob);
router.put('/:id', protect, restrictTo('admin', 'super_admin'), jobController.updateJob);
router.delete('/:id', protect, restrictTo('admin', 'super_admin'), jobController.deleteJob);

module.exports = router;