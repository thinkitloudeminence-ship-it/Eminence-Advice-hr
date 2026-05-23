const express = require('express');
const router = express.Router();
const jobController = require('../controllers/job.controller');
const authController = require('../controllers/auth.controller');

router.get('/', jobController.getAllJobs);
router.get('/:id', jobController.getJobById);
router.post('/', authController.protect, authController.restrictTo('admin', 'super_admin'), jobController.createJob);
router.put('/:id', authController.protect, authController.restrictTo('admin', 'super_admin'), jobController.updateJob);
router.delete('/:id', authController.protect, authController.restrictTo('admin', 'super_admin'), jobController.deleteJob);

module.exports = router;