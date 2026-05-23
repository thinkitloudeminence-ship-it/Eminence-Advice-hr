const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  jobType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote', 'Hybrid'],
    required: true
  },
  experience: {
    min: Number,
    max: Number,
    required: true
  },
  salary: {
    min: Number,
    max: Number,
    currency: {
      type: String,
      default: 'INR'
    }
  },
  skills: [{
    type: String,
    required: true
  }],
  description: {
    type: String,
    required: [true, 'Job description is required']
  },
  responsibilities: [String],
  requirements: [String],
  benefits: [String],
  category: {
    type: String,
    enum: ['IT', 'HR', 'Finance', 'Sales', 'Marketing', 'BDE', 'Other'],
    required: true
  },
  positions: {
    type: Number,
    required: true,
    min: 1
  },
  deadline: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'closed', 'draft'],
    default: 'active'
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  views: {
    type: Number,
    default: 0
  },
  applications: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for search
jobSchema.index({ title: 'text', description: 'text', skills: 'text' });

module.exports = mongoose.model('Job', jobSchema);