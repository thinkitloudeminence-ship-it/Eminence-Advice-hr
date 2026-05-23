const express = require('express');
const router = express.Router();
const websiteContentController = require('../controllers/websiteContent.controller');
const authController = require('../controllers/auth.controller');

router.get('/:page', websiteContentController.getPageContent);
router.put('/:page/:section', authController.protect, authController.restrictTo('admin', 'super_admin'), websiteContentController.updateContent);

module.exports = router;