const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');
const { protect, restrictTo } = require('../middleware/auth');

router.post('/', contactController.submitContactForm);
router.get('/', protect, restrictTo('admin', 'super_admin'), contactController.getAllLeads);
router.get('/:id', protect, restrictTo('admin', 'super_admin'), contactController.getLeadById);
router.put('/:id/status', protect, restrictTo('admin', 'super_admin'), contactController.updateLeadStatus);
router.delete('/:id', protect, restrictTo('admin', 'super_admin'), contactController.deleteLead);

module.exports = router;