const Application = require('../models/Application.model');
const Job = require('../models/Job.model');
const cloudinary = require('../utils/cloudinary');
const sendEmail = require('../utils/email');

exports.submitApplication = async (req, res, next) => {
  try {
    const applicationData = { ...req.body };

    // Parse JSON fields if sent as strings
    if (applicationData.qualification && typeof applicationData.qualification === 'string') {
      applicationData.qualification = JSON.parse(applicationData.qualification);
    }
    if (applicationData.experienceDetails && typeof applicationData.experienceDetails === 'string') {
      applicationData.experienceDetails = JSON.parse(applicationData.experienceDetails);
    }
    if (applicationData.skills && typeof applicationData.skills === 'string') {
      try {
        applicationData.skills = JSON.parse(applicationData.skills);
      } catch {
        applicationData.skills = applicationData.skills.split(',').map(s => s.trim()).filter(Boolean);
      }
    }

    const job = await Job.findById(applicationData.job);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Upload resume to Cloudinary
    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'resumes',
          resource_type: 'auto'
        });
        applicationData.resume = {
          url: result.secure_url,
          publicId: result.public_id
        };
      } catch (cloudErr) {
        console.error('Resume upload error:', cloudErr.message);
      }
    }

    const application = await Application.create(applicationData);

    // ✅ updateOne use karo - save() hook issues avoid
    try {
      await Job.updateOne({ _id: job._id }, { $inc: { applications: 1 } });
    } catch (e) {
      console.warn('Job applications count update failed:', e.message);
    }

    // ✅ Email send - non-blocking
    sendEmail({
      email: application.email,
      name: application.fullName,
      subject: 'Application Received - Eminance Advice',
      message: `Your application for <strong>${job.title}</strong> at <strong>${job.company}</strong> has been received successfully. We will review your application and get back to you soon.`
    }).catch(e => console.warn('Email failed:', e.message));

    res.status(201).json({
      status: 'success',
      data: application
    });
  } catch (error) {
    console.error('Submit application error:', error);
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
      { status, notes, reviewedBy: req.user._id, reviewedAt: Date.now() },
      { new: true, runValidators: true }
    ).populate('job', 'title company');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    const statusMessages = {
      shortlisted: 'Congratulations! You have been shortlisted for the next round.',
      selected: 'Congratulations! You have been selected for the position.',
      rejected: 'We regret to inform you that your application has not been selected at this time.',
    };

    sendEmail({
      email: application.email,
      name: application.fullName,
      subject: `Application Status Update - ${application.job.title}`,
      message: `${statusMessages[status] || 'Your application status has been updated.'}${notes ? `<br/><br/><strong>Notes:</strong> ${notes}` : ''}`
    }).catch(e => console.warn('Email failed:', e.message));

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

    if (application.resume?.publicId) {
      try {
        await cloudinary.uploader.destroy(application.resume.publicId);
      } catch (e) {
        console.warn('Resume delete from Cloudinary failed:', e.message);
      }
    }

    res.status(204).json({ status: 'success', data: null });
  } catch (error) {
    next(error);
  }
};