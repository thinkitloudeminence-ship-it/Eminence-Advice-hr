const express = require('express');
const router = express.Router();
const jobController = require('../controllers/job.controller');
const { protect, restrictTo } = require('../middleware/auth');  // ← CHANGE: auth.controller se nahi, middleware se import karo

router.get('/', jobController.getAllJobs);
router.get('/:id', jobController.getJobById);
router.post('/', protect, restrictTo('admin', 'super_admin'), jobController.createJob);
router.put('/:id', protect, restrictTo('admin', 'super_admin'), jobController.updateJob);
router.delete('/:id', protect, restrictTo('admin', 'super_admin'), jobController.deleteJob);

module.exports = router;