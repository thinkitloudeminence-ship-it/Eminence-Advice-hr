const Blog = require('../models/Blog.model');
const cloudinary = require('../utils/cloudinary');

exports.getAllBlogs = async (req, res, next) => {
  try {
    const { page = 1, limit = 9, category, search } = req.query;
    
    let query = { status: 'published' };
    if (category) query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }
    
    const blogs = await Blog.find(query)
      .sort('-publishedAt')
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
    next(error);
  }
};

exports.getBlogBySlug = async (req, res, next) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug })
      .populate('author', 'name email');
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    blog.views += 1;
    await blog.save();
    
    res.status(200).json({
      status: 'success',
      data: blog
    });
  } catch (error) {
    next(error);
  }
};

exports.createBlog = async (req, res, next) => {
  try {
    const blogData = req.body;
    blogData.author = req.user._id;
    
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'blogs',
        transformation: [{ width: 1200, height: 630, crop: 'fill' }]
      });
      blogData.featuredImage = {
        url: result.secure_url,
        publicId: result.public_id
      };
    }
    
    if (blogData.status === 'published') {
      blogData.publishedAt = Date.now();
    }
    
    const blog = await Blog.create(blogData);
    
    res.status(201).json({
      status: 'success',
      data: blog
    });
  } catch (error) {
    next(error);
  }
};

exports.updateBlog = async (req, res, next) => {
  try {
    const blogData = req.body;
    
    if (req.file) {
      const blog = await Blog.findById(req.params.id);
      if (blog.featuredImage && blog.featuredImage.publicId) {
        await cloudinary.uploader.destroy(blog.featuredImage.publicId);
      }
      
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'blogs',
        transformation: [{ width: 1200, height: 630, crop: 'fill' }]
      });
      blogData.featuredImage = {
        url: result.secure_url,
        publicId: result.public_id
      };
    }
    
    if (blogData.status === 'published' && !req.body.publishedAt) {
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
    next(error);
  }
};

exports.deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    if (blog.featuredImage && blog.featuredImage.publicId) {
      await cloudinary.uploader.destroy(blog.featuredImage.publicId);
    }
    
    await blog.remove();
    
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(error);
  }
};