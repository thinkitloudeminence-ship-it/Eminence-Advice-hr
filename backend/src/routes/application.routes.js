const express = require('express');
const router = express.Router();
const multer = require('multer');
const applicationController = require('../controllers/application.controller');
const { protect, restrictTo } = require('../middleware/auth');
const Application = require('../models/Application.model');
const cloudinary = require('../utils/cloudinary');

const upload = multer({ dest: 'uploads/' });

// Public route (no auth required for submission)
router.post('/', upload.single('resume'), applicationController.submitApplication);

// Protected routes (admin only)
router.get('/', protect, restrictTo('admin', 'super_admin'), applicationController.getAllApplications);
router.get('/:id', protect, restrictTo('admin', 'super_admin'), applicationController.getApplicationById);
router.put('/:id/status', protect, restrictTo('admin', 'super_admin'), applicationController.updateApplicationStatus);
router.delete('/:id', protect, restrictTo('admin', 'super_admin'), applicationController.deleteApplication);

// Download resume route - with signed URL
router.get('/:id/download-resume', async (req, res) => {
  try {
    let token = req.query.token;
    if (!token && req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const jwt = require('jsonwebtoken');
    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    const application = await Application.findById(req.params.id);
    if (!application?.resume?.url) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // ✅ URL as-is use karo, koi replacement nahi
    // fl_attachment force download karega
    let fileUrl = application.resume.url;
    
    // Cloudinary fl_attachment transformation add karo for force download
    fileUrl = fileUrl.replace('/upload/', '/upload/fl_attachment/');

    res.redirect(fileUrl);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;