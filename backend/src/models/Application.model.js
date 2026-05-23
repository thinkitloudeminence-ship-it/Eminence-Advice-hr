const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
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
  experienceType: {
    type: String,
    enum: ['fresher', 'experienced'],
    required: true
  },
  experienceDetails: {
    years: Number,
    months: Number,
    currentCompany: String,
    currentRole: String
  },
  qualification: {
    degree: String,
    institution: String,
    yearOfPassing: Number,
    percentage: Number
  },
  skills: [String],
  preferredJobRole: String,
  currentLocation: String,
  resume: {
    url: String,
    publicId: String
  },
  linkedinProfile: String,
  portfolioUrl: String,
  message: String,
  status: {
    type: String,
    enum: ['pending', 'shortlisted', 'rejected', 'selected'],
    default: 'pending'
  },
  appliedAt: {
    type: Date,
    default: Date.now
  },
  notes: String,
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reviewedAt: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('Application', applicationSchema);