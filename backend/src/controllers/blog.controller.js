const Blog = require('../models/Blog.model');
const cloudinary = require('../utils/cloudinary');

// Get all blogs (published only - for frontend)
exports.getAllBlogs = async (req, res, next) => {
  try {
    const { page = 1, limit = 9, category, search } = req.query;
    
    let query = { status: 'published' };
    if (category && category !== 'All') query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }
    
    const blogs = await Blog.find(query)
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('author', 'name');
    
    const total = await Blog.countDocuments(query);
    
    res.status(200).json({
      status: 'success',
      results: blogs.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
      data: blogs
    });
  } catch (error) {
    console.error('Get all blogs error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get all blogs for admin (includes drafts)
exports.getAllBlogsAdmin = async (req, res, next) => {
  try {
    const blogs = await Blog.find()
      .sort('-createdAt')
      .populate('author', 'name');
    
    res.status(200).json({
      status: 'success',
      results: blogs.length,
      data: blogs
    });
  } catch (error) {
    console.error('Get admin blogs error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get blog by slug (for frontend)
exports.getBlogBySlug = async (req, res, next) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug })
      .populate('author', 'name email');
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    // ✅ updateOne use karo - save() pre-hook trigger karta tha
    await Blog.updateOne({ _id: blog._id }, { $inc: { views: 1 } });
    
    res.status(200).json({
      status: 'success',
      data: blog
    });
  } catch (error) {
    console.error('Get blog by slug error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get blog by ID (for admin edit)
exports.getBlogById = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('author', 'name email');
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    res.status(200).json({
      status: 'success',
      data: blog
    });
  } catch (error) {
    console.error('Get blog by ID error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Create blog
exports.createBlog = async (req, res, next) => {
  try {
    const blogData = { ...req.body };
    blogData.author = req.user._id;
    
    // Parse SEO data if sent as string
    if (blogData.seo && typeof blogData.seo === 'string') {
      try {
        blogData.seo = JSON.parse(blogData.seo);
      } catch (e) {
        blogData.seo = {};
      }
    }
    
    // Upload image to Cloudinary if exists
    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'blogs',
          transformation: [{ width: 1200, height: 630, crop: 'fill' }]
        });
        blogData.featuredImage = {
          url: result.secure_url,
          publicId: result.public_id
        };
      } catch (cloudErr) {
        console.error('Cloudinary upload error:', cloudErr);
      }
    }
    
    // Parse tags
    if (blogData.tags && typeof blogData.tags === 'string') {
      blogData.tags = blogData.tags.split(',').map(tag => tag.trim()).filter(Boolean);
    }
    
    if (blogData.status === 'published') {
      blogData.publishedAt = Date.now();
    }

    // ✅ slug manually set karo - pre-save hook pe depend mat karo
    if (blogData.title) {
      const slugify = require('slugify');
      blogData.slug = slugify(blogData.title, { lower: true, strict: true });
    }
    
    const blog = await Blog.create(blogData);
    
    res.status(201).json({
      status: 'success',
      data: blog
    });
  } catch (error) {
    console.error('Create blog error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update blog
exports.updateBlog = async (req, res, next) => {
  try {
    const blogData = { ...req.body };
    
    // Parse SEO data if sent as string
    if (blogData.seo && typeof blogData.seo === 'string') {
      try {
        blogData.seo = JSON.parse(blogData.seo);
      } catch (e) {
        blogData.seo = {};
      }
    }
    
    // Parse tags
    if (blogData.tags && typeof blogData.tags === 'string') {
      blogData.tags = blogData.tags.split(',').map(tag => tag.trim()).filter(Boolean);
    }
    
    // Upload new image if exists
    if (req.file) {
      try {
        const existingBlog = await Blog.findById(req.params.id);
        if (existingBlog?.featuredImage?.publicId) {
          await cloudinary.uploader.destroy(existingBlog.featuredImage.publicId);
        }
        
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'blogs',
          transformation: [{ width: 1200, height: 630, crop: 'fill' }]
        });
        blogData.featuredImage = {
          url: result.secure_url,
          publicId: result.public_id
        };
      } catch (cloudErr) {
        console.error('Cloudinary upload error:', cloudErr);
      }
    }
    
    if (blogData.status === 'published' && !blogData.publishedAt) {
      blogData.publishedAt = Date.now();
    }
    
    const blog = await Blog.findByIdAndUpdate(req.params.id, blogData, {
      new: true,
      runValidators: true
    });
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    res.status(200).json({
      status: 'success',
      data: blog
    });
  } catch (error) {
    console.error('Update blog error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Delete blog
exports.deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    if (blog.featuredImage?.publicId) {
      try {
        await cloudinary.uploader.destroy(blog.featuredImage.publicId);
      } catch (cloudErr) {
        console.error('Cloudinary delete error:', cloudErr);
      }
    }
    
    await Blog.findByIdAndDelete(req.params.id);
    
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    console.error('Delete blog error:', error);
    res.status(500).json({ message: error.message });
  }
};