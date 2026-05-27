const User = require('../models/User.model');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  user.password = undefined;
  
  res.status(statusCode).json({
    success: true,
    token,
    data: { user }
  });
};

// Register function
exports.register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { name, email, password, phone } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    
    const user = await User.create({
      name,
      email,
      password,
      phone,
      role: 'user'
    });
    
    createSendToken(user, 201, res);
  } catch (error) {
    next(error);
  }
};

// Login function
exports.login = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    
    email = email.trim().toLowerCase();
    
    console.log('Login attempt - Email:', email);
    console.log('Login attempt - Password:', password);
    
    const user = await User.findOne({ email }).select('+password');
    console.log('User found:', user ? 'Yes' : 'No');
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    const isMatch = await user.comparePassword(password);
    console.log('Password match:', isMatch);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // ✅ Don't let lastLogin failure block login
    try {
      user.lastLogin = Date.now();
      await user.save({ validateBeforeSave: false });
    } catch (saveError) {
      console.warn('⚠️ Could not update lastLogin:', saveError.message);
    }
    
    createSendToken(user, 200, res);
  } catch (error) {
    console.error('Login error:', error);
    next(error);
  }
};