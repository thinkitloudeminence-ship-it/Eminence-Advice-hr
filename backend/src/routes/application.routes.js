const express = require('express');
const router = express.Router();
const multer = require('multer');
const applicationController = require('../controllers/application.controller');
const authController = require('../controllers/auth.controller');

const upload = multer({ dest: 'uploads/' });

router.get('/', authController.protect, authController.restrictTo('admin', 'super_admin'), applicationController.getAllApplications);
router.post('/', upload.single('resume'), applicationController.submitApplication);
router.get('/:id', authController.protect, applicationController.getApplicationById);
router.put('/:id/status', authController.protect, authController.restrictTo('admin', 'super_admin'), applicationController.updateApplicationStatus);
router.delete('/:id', authController.protect, authController.restrictTo('admin', 'super_admin'), applicationController.deleteApplication);

module.exports = router;