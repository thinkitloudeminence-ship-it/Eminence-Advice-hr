const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/auth.controller');

router.post('/register', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], authController.register);

router.post('/login', authController.login);

module.exports = router;