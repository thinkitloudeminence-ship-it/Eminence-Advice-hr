const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Blog title is required'],
    trim: true,
    unique: true
  },
  slug: {
    type: String
    // ✅ unique: true HATAO
  },
  content: {
    type: String,
    required: [true, 'Blog content is required']
  },
  excerpt: {
    type: String,
    required: [true, 'Blog excerpt is required'],
    maxlength: 1000
  },
  category: {
    type: String,
    enum: ['Career Guidance', 'Interview Tips', 'Resume Building', 'HR Insights',
           'Placement Guidance', 'Freelancing Tips', 'AI Tools Awareness', 'Workplace Skills'],
    required: true
  },
  featuredImage: {
    url: String,
    publicId: String
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tags: [String],
  faqs: [{
    question: { type: String, required: true },
    answer:   { type: String, required: true }
  }],
  views:  { type: Number, default: 0 },
  likes:  { type: Number, default: 0 },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  publishedAt: Date,
  seo: {
    metaTitle:       String,
    metaDescription: String,
    keywords:        [String],
    canonicalUrl:    String
  }
}, { timestamps: true });

// ✅ Unique index yahan banao
blogSchema.index({ slug: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model('Blog', blogSchema);