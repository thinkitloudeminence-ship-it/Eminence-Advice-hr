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
    required: [true, 'Job type is required']
  },
  experienceMin: {
    type: Number,
    default: 0
  },
  experienceMax: {
    type: Number,
    default: 0
  },
  salaryMin: {
    type: Number,
    default: 0
  },
  salaryMax: {
    type: Number,
    default: 0
  },
  salaryCurrency: {
    type: String,
    default: 'INR'
  },
  skills: {
    type: [String],
    default: []
  },
  description: {
    type: String,
    required: [true, 'Job description is required']
  },
  responsibilities: {
    type: [String],
    default: []
  },
  requirements: {
    type: [String],
    default: []
  },
  benefits: {
    type: [String],
    default: []
  },
  category: {
    type: String,
    enum: ['IT', 'HR', 'Finance', 'Sales', 'Marketing', 'BDE', 'Other'],
    required: [true, 'Category is required']
  },
  positions: {
    type: Number,
    required: [true, 'Number of positions is required'],
    min: 1
  },
  deadline: {
    type: Date,
    required: [true, 'Deadline is required']
  },
  status: {
    type: String,
    enum: ['active', 'closed', 'draft'],
    default: 'active'
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Posted by is required']
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

jobSchema.index({ title: 'text', description: 'text', skills: 'text' });

module.exports = mongoose.model('Job', jobSchema);