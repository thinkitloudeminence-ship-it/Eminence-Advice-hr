const mongoose = require('mongoose');

const websiteContentSchema = new mongoose.Schema({
  page: {
    type: String,
    required: true,
    enum: ['home', 'about', 'services', 'contact']
  },
  section: {
    type: String,
    required: true
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('WebsiteContent', websiteContentSchema);