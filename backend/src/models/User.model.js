const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },

  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },

  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false
  },

  role: {
    type: String,
    enum: ['user', 'admin', 'super_admin'],
    default: 'user'
  },

  phone: {
    type: String,
    trim: true
  },

  profileImage: {
    type: String,
    default: null
  },

  isActive: {
    type: Boolean,
    default: true
  },

  lastLogin: {
    type: Date
  },

  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date

}, {
  timestamps: true
});


// HASH PASSWORD BEFORE SAVE
userSchema.pre('save', async function () {

  // Only hash if password modified
  if (!this.isModified('password')) {
    return;
  }

  // Generate salt
  const salt = await bcrypt.genSalt(10);

  // Hash password
  this.password = await bcrypt.hash(this.password, salt);
});


// COMPARE PASSWORD
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);