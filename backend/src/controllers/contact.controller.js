const ContactLead = require('../models/ContactLead.model');
const sendEmail = require('../utils/email');

exports.submitContactForm = async (req, res, next) => {
  try {
    const leadData = req.body;
    
    const lead = await ContactLead.create(leadData);
    
    await sendEmail({
      email: lead.email,
      subject: 'Thank you for contacting Eminance Advice',
      html: `
        <h2>We received your inquiry!</h2>
        <p>Dear ${lead.fullName},</p>
        <p>Thank you for reaching out to Eminance Advice. Our team will get back to you within 24 hours.</p>
        <p><strong>Your Query:</strong> ${lead.message}</p>
        <br/>
        <p>Best regards,<br/>Eminance Advice Team</p>
      `
    });
    
    await sendEmail({
      email: process.env.EMAIL_USER,
      subject: 'New Contact Form Submission',
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${lead.fullName}</p>
        <p><strong>Email:</strong> ${lead.email}</p>
        <p><strong>Phone:</strong> ${lead.phone}</p>
        <p><strong>Service Required:</strong> ${lead.serviceRequired}</p>
        <p><strong>Message:</strong> ${lead.message}</p>
        <a href="${process.env.ADMIN_URL}/leads/${lead._id}">View Lead</a>
      `
    });
    
    res.status(201).json({
      status: 'success',
      message: 'Thank you for contacting us. We will get back to you soon.',
      data: lead
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllLeads = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    
    let query = {};
    if (status) query.status = status;
    
    const leads = await ContactLead.find(query)
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await ContactLead.countDocuments(query);
    
    res.status(200).json({
      status: 'success',
      results: leads.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
      data: leads
    });
  } catch (error) {
    next(error);
  }
};

exports.getLeadById = async (req, res, next) => {
  try {
    const lead = await ContactLead.findById(req.params.id);
    
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    
    res.status(200).json({
      status: 'success',
      data: lead
    });
  } catch (error) {
    next(error);
  }
};

exports.updateLeadStatus = async (req, res, next) => {
  try {
    const { status, notes } = req.body;
    
    const lead = await ContactLead.findByIdAndUpdate(
      req.params.id,
      { status, notes },
      { new: true, runValidators: true }
    );
    
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    
    res.status(200).json({
      status: 'success',
      data: lead
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteLead = async (req, res, next) => {
  try {
    const lead = await ContactLead.findByIdAndDelete(req.params.id);
    
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(error);
  }
};