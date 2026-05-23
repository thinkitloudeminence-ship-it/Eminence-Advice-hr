const mongoose = require('mongoose');

const contactLeadSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  currentStatus: {
    type: String,
    enum: ['student', 'fresher', 'professional', 'company'],
    required: true
  },
  experience: {
    type: String,
    trim: true
  },
  serviceRequired: {
    type: String,
    enum: ['career counseling', 'training', 'placement', 'recruitment', 'freelancing', 'other'],
    required: true
  },
  message: {
    type: String,
    required: [true, 'Message is required']
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'converted', 'lost'],
    default: 'new'
  },
  notes: String
}, {
  timestamps: true
});

module.exports = mongoose.model('ContactLead', contactLeadSchema);