const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const blogController = require('../controllers/blog.controller');
const { protect, restrictTo } = require('../middleware/auth');

// ✅ Admin routes - SPECIFIC (pehle)
router.get('/admin/list', protect, restrictTo('admin', 'super_admin'), blogController.getAllBlogsAdmin);
router.get('/admin/:id', protect, restrictTo('admin', 'super_admin'), blogController.getBlogById);
router.post('/', protect, restrictTo('admin', 'super_admin'), upload.single('featuredImage'), blogController.createBlog);
router.put('/:id', protect, restrictTo('admin', 'super_admin'), upload.single('featuredImage'), blogController.updateBlog);
router.delete('/:id', protect, restrictTo('admin', 'super_admin'), blogController.deleteBlog);

// ✅ Public routes - DYNAMIC (baad mein)
router.get('/', blogController.getAllBlogs);
router.get('/:slug', blogController.getBlogBySlug);

module.exports = router;