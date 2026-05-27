const express = require('express');
const router = express.Router();
const multer = require('multer');
const applicationController = require('../controllers/application.controller');
const { protect, restrictTo } = require('../middleware/auth');

const upload = multer({ dest: 'uploads/' });

router.get('/', protect, restrictTo('admin', 'super_admin'), applicationController.getAllApplications);
router.post('/', upload.single('resume'), applicationController.submitApplication);
router.get('/:id', protect, applicationController.getApplicationById);
router.put('/:id/status', protect, restrictTo('admin', 'super_admin'), applicationController.updateApplicationStatus);
router.delete('/:id', protect, restrictTo('admin', 'super_admin'), applicationController.deleteApplication);

module.exports = router;