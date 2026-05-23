const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const authController = require('../controllers/auth.controller');

router.use(authController.protect);
router.use(authController.restrictTo('admin', 'super_admin'));

router.post('/create-admin', adminController.createAdmin);
router.get('/users', adminController.getAllUsers);
router.put('/users/:id/role', adminController.updateUserRole);
router.delete('/users/:id', adminController.deleteUser);

module.exports = router;