const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');
const authController = require('../controllers/auth.controller');

router.post('/', contactController.submitContactForm);
router.get('/', authController.protect, authController.restrictTo('admin', 'super_admin'), contactController.getAllLeads);
router.get('/:id', authController.protect, authController.restrictTo('admin', 'super_admin'), contactController.getLeadById);
router.put('/:id/status', authController.protect, authController.restrictTo('admin', 'super_admin'), contactController.updateLeadStatus);
router.delete('/:id', authController.protect, authController.restrictTo('admin', 'super_admin'), contactController.deleteLead);

module.exports = router;