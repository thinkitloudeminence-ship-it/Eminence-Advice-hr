const mongoose = require('mongoose');
const slugify = require('slugify');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true
  },
  slug: {
  type: String,
  unique: true,
  sparse: true
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
  experience: {
    min: { type: Number, default: 0 },
    max: { type: Number, default: 0 }
  },
  salary: {
    min: { type: Number, default: 0 },
    max: { type: Number, default: 0 },
    currency: { type: String, default: 'INR' }
  },
  skills: { type: [String], default: [] },
  description: {
    type: String,
    required: [true, 'Job description is required']
  },
  responsibilities: { type: [String], default: [] },
  requirements: { type: [String], default: [] },
  benefits: { type: [String], default: [] },
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
    required: true
  },
  views: { type: Number, default: 0 },
  applications: { type: Number, default: 0 }
}, { timestamps: true });

// ✅ Auto-generate slug from title
jobSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

jobSchema.index({ title: 'text', description: 'text', skills: 'text' });
jobSchema.index({ slug: 1 });

module.exports = mongoose.model('Job', jobSchema);