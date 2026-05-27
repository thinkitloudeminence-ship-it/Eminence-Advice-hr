const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/service.controller');
const { protect, restrictTo } = require('../middleware/auth');

router.get('/', serviceController.getAllServices);
router.get('/:id', serviceController.getServiceById);
router.post('/', protect, restrictTo('admin', 'super_admin'), serviceController.createService);
router.put('/:id', protect, restrictTo('admin', 'super_admin'), serviceController.updateService);
router.delete('/:id', protect, restrictTo('admin', 'super_admin'), serviceController.deleteService);

module.exports = router;