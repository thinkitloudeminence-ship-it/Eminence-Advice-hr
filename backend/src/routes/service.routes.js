const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/service.controller');
const authController = require('../controllers/auth.controller');

router.get('/', serviceController.getAllServices);
router.get('/:id', serviceController.getServiceById);
router.post('/', authController.protect, authController.restrictTo('admin', 'super_admin'), serviceController.createService);
router.put('/:id', authController.protect, authController.restrictTo('admin', 'super_admin'), serviceController.updateService);
router.delete('/:id', authController.protect, authController.restrictTo('admin', 'super_admin'), serviceController.deleteService);

module.exports = router;