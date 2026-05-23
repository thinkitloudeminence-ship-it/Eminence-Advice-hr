const Application = require('../models/Application.model');
const Job = require('../models/Job.model');
const cloudinary = require('../utils/cloudinary');
const sendEmail = require('../utils/email');

exports.submitApplication = async (req, res, next) => {
  try {
    const applicationData = req.body;
    
    const job = await Job.findById(applicationData.job);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'resumes',
        resource_type: 'auto'
      });
      applicationData.resume = {
        url: result.secure_url,
        publicId: result.public_id
      };
    }
    
    const application = await Application.create(applicationData);
    
    job.applications += 1;
    await job.save();
    
    await sendEmail({
      email: application.email,
      subject: 'Application Received - Eminance Advice',
      html: `
        <h2>Thank you for applying!</h2>
        <p>Dear ${application.fullName},</p>
        <p>Your application for the position of ${job.title} has been received successfully.</p>
        <p>We will review your application and get back to you soon.</p>
        <br/>
        <p>Best regards,<br/>Eminance Advice Team</p>
      `
    });
    
    res.status(201).json({
      status: 'success',
      data: application
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllApplications = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status, jobId } = req.query;
    
    let query = {};
    if (status) query.status = status;
    if (jobId) query.job = jobId;
    
    const applications = await Application.find(query)
      .populate('job', 'title company')
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Application.countDocuments(query);
    
    res.status(200).json({
      status: 'success',
      results: applications.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
      data: applications
    });
  } catch (error) {
    next(error);
  }
};

exports.getApplicationById = async (req, res, next) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('job', 'title company location')
      .populate('reviewedBy', 'name email');
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    res.status(200).json({
      status: 'success',
      data: application
    });
  } catch (error) {
    next(error);
  }
};

exports.updateApplicationStatus = async (req, res, next) => {
  try {
    const { status, notes } = req.body;
    
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      {
        status,
        notes,
        reviewedBy: req.user._id,
        reviewedAt: Date.now()
      },
      { new: true, runValidators: true }
    ).populate('job', 'title company');
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    let statusMessage = '';
    switch(status) {
      case 'shortlisted':
        statusMessage = 'Congratulations! You have been shortlisted for the next round.';
        break;
      case 'selected':
        statusMessage = 'Congratulations! You have been selected for the position.';
        break;
      case 'rejected':
        statusMessage = 'We regret to inform you that you have not been selected.';
        break;
      default:
        statusMessage = 'Your application is under review.';
    }
    
    await sendEmail({
      email: application.email,
      subject: `Application Status Update - ${application.job.title}`,
      html: `
        <h2>Application Status Update</h2>
        <p>Dear ${application.fullName},</p>
        <p>${statusMessage}</p>
        ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ''}
        <br/>
        <p>Best regards,<br/>Eminance Advice Team</p>
      `
    });
    
    res.status(200).json({
      status: 'success',
      data: application
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteApplication = async (req, res, next) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    if (application.resume && application.resume.publicId) {
      await cloudinary.uploader.destroy(application.resume.publicId);
    }
    
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(error);
  }
};