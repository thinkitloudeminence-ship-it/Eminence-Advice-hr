const express = require('express');
const router = express.Router();
const multer = require('multer');
const https = require('https');
const jwt = require('jsonwebtoken');
const { v2: cloudinary } = require('cloudinary');

const applicationController = require('../controllers/application.controller');
const { protect, restrictTo } = require('../middleware/auth');
const Application = require('../models/Application.model');

const upload = multer({ dest: 'uploads/' });

// ─── Public ───────────────────────────────────────────────────────────────────
router.post('/', upload.single('resume'), applicationController.submitApplication);

// ─── Admin protected ──────────────────────────────────────────────────────────
router.get('/',          protect, restrictTo('admin', 'super_admin'), applicationController.getAllApplications);
router.put('/:id/status',protect, restrictTo('admin', 'super_admin'), applicationController.updateApplicationStatus);
router.delete('/:id',    protect, restrictTo('admin', 'super_admin'), applicationController.deleteApplication);
router.get('/:id',       protect, restrictTo('admin', 'super_admin'), applicationController.getApplicationById);

// ─── Helper: verify token from header OR ?token= query param ─────────────────
function verifyToken(req) {
  let token = req.query.token;
  if (!token && req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) return false;
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

// ─── Helper: get Cloudinary signed URL (bypasses 401 on CDN) ─────────────────
function getSignedCloudinaryUrl(resumeUrl, publicId) {
  // Detect resource_type from stored URL
  const resourceType = resumeUrl.includes('/raw/upload/') ? 'raw' : 'image';

  // Generate signed URL using SDK — works regardless of CDN restrictions
  return cloudinary.url(publicId, {
    resource_type: resourceType,
    type: 'upload',
    sign_url: true,
    secure: true,
  });
}

// ─── Stream helper ────────────────────────────────────────────────────────────
function streamFromUrl(url, res) {
  https.get(url, (fileStream) => {
    if (fileStream.statusCode !== 200) {
      if (!res.headersSent) {
        res.status(500).json({ message: `Cloudinary returned ${fileStream.statusCode}` });
      }
      return;
    }
    fileStream.pipe(res);
  }).on('error', (err) => {
    console.error('Stream error:', err.message);
    if (!res.headersSent) res.status(500).json({ message: err.message });
  });
}

// ─── DOWNLOAD: Content-Disposition: attachment → triggers save dialog ─────────
router.get('/:id/download-resume', async (req, res) => {
  if (!verifyToken(req)) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const application = await Application.findById(req.params.id);
    if (!application?.resume?.url || !application?.resume?.publicId) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    const signedUrl  = getSignedCloudinaryUrl(application.resume.url, application.resume.publicId);
    const safeName   = application.fullName.replace(/[^a-zA-Z0-9]/g, '_');

    res.setHeader('Content-Disposition', `attachment; filename="${safeName}_resume.pdf"`);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Access-Control-Allow-Origin', '*');

    streamFromUrl(signedUrl, res);
  } catch (err) {
    console.error('Download error:', err);
    if (!res.headersSent) res.status(500).json({ message: err.message });
  }
});

// ─── VIEW: Content-Disposition: inline → renders in browser / iframe ──────────
router.get('/:id/view-resume', async (req, res) => {
  if (!verifyToken(req)) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const application = await Application.findById(req.params.id);
    if (!application?.resume?.url || !application?.resume?.publicId) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    const signedUrl = getSignedCloudinaryUrl(application.resume.url, application.resume.publicId);
    const safeName  = application.fullName.replace(/[^a-zA-Z0-9]/g, '_');

    res.setHeader('Content-Disposition', `inline; filename="${safeName}_resume.pdf"`);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Allow iframe embedding
    res.setHeader('X-Frame-Options', 'ALLOWALL');
    res.setHeader('Content-Security-Policy', "frame-ancestors *");

    streamFromUrl(signedUrl, res);
  } catch (err) {
    console.error('View error:', err);
    if (!res.headersSent) res.status(500).json({ message: err.message });
  }
});

module.exports = router;