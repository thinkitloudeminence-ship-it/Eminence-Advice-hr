const mongoose = require('mongoose');

const seoSettingsSchema = new mongoose.Schema({
  page: {
    type: String,
    required: true,
    unique: true
  },
  metaTitle: {
    type: String,
    required: true
  },
  metaDescription: {
    type: String,
    required: true
  },
  keywords: [String],
  ogTitle: String,
  ogDescription: String,
  ogImage: String,
  twitterCard: String,
  twitterTitle: String,
  twitterDescription: String,
  canonicalUrl: String,
  schemaMarkup: mongoose.Schema.Types.Mixed
}, {
  timestamps: true
});

module.exports = mongoose.model('SEOSetting', seoSettingsSchema);