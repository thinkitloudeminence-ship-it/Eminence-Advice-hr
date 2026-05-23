const express = require('express');
const router = express.Router();
const seoController = require('../controllers/seo.controller');
const authController = require('../controllers/auth.controller');

router.get('/:page', seoController.getSeoSettings);
router.put('/:page', authController.protect, authController.restrictTo('admin', 'super_admin'), seoController.updateSeoSettings);

module.exports = router;