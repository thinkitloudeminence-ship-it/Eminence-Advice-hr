const express = require('express');
const router = express.Router();
const multer = require('multer');
const blogController = require('../controllers/blog.controller');
const authController = require('../controllers/auth.controller');

const upload = multer({ dest: 'uploads/' });

router.get('/', blogController.getAllBlogs);
router.get('/:slug', blogController.getBlogBySlug);
router.post('/', authController.protect, authController.restrictTo('admin', 'super_admin'), upload.single('featuredImage'), blogController.createBlog);
router.put('/:id', authController.protect, authController.restrictTo('admin', 'super_admin'), upload.single('featuredImage'), blogController.updateBlog);
router.delete('/:id', authController.protect, authController.restrictTo('admin', 'super_admin'), blogController.deleteBlog);

module.exports = router;