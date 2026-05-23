const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['counseling', 'training', 'placement'],
    required: true
  },
  title: {
    type: String,
    required: [true, 'Service title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Service description is required']
  },
  icon: String,
  features: [String],
  price: {
    type: Number,
    default: 0
  },
  duration: String,
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Service', serviceSchema);