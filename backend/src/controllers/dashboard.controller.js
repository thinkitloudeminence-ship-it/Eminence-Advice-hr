const Job = require('../models/Job.model');
const Application = require('../models/Application.model');
const Blog = require('../models/Blog.model');
const ContactLead = require('../models/ContactLead.model');
const User = require('../models/User.model');

exports.getDashboardStats = async (req, res, next) => {
  try {
    const [
      totalJobs,
      activeJobs,
      totalApplications,
      pendingApplications,
      shortlistedApplications,
      selectedApplications,
      totalBlogs,
      publishedBlogs,
      totalLeads,
      newLeads,
      totalUsers
    ] = await Promise.all([
      Job.countDocuments(),
      Job.countDocuments({ status: 'active' }),
      Application.countDocuments(),
      Application.countDocuments({ status: 'pending' }),
      Application.countDocuments({ status: 'shortlisted' }),
      Application.countDocuments({ status: 'selected' }),
      Blog.countDocuments(),
      Blog.countDocuments({ status: 'published' }),
      ContactLead.countDocuments(),
      ContactLead.countDocuments({ status: 'new' }),
      User.countDocuments({ role: 'user' })
    ]);
    
    res.status(200).json({
      status: 'success',
      data: {
        totalJobs,
        activeJobs,
        totalApplications,
        pendingApplications,
        shortlistedApplications,
        selectedApplications,
        totalBlogs,
        publishedBlogs,
        totalLeads,
        newLeads,
        totalUsers
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getChartData = async (req, res, next) => {
  try {
    const last6Months = [];
    const today = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const month = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const nextMonth = new Date(today.getFullYear(), today.getMonth() - i + 1, 1);
      
      const applications = await Application.countDocuments({
        createdAt: { $gte: month, $lt: nextMonth }
      });
      
      const jobs = await Job.countDocuments({
        createdAt: { $gte: month, $lt: nextMonth }
      });
      
      last6Months.push({
        month: month.toLocaleString('default', { month: 'short' }),
        applications,
        jobs
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: last6Months
    });
  } catch (error) {
    next(error);
  }
};

exports.getRecentActivities = async (req, res, next) => {
  try {
    const recentApplications = await Application.find()
      .sort('-createdAt')
      .limit(10)
      .populate('job', 'title');
    
    const recentLeads = await ContactLead.find()
      .sort('-createdAt')
      .limit(5);
    
    const recentBlogs = await Blog.find()
      .sort('-createdAt')
      .limit(5);
    
    res.status(200).json({
      status: 'success',
      data: {
        applications: recentApplications,
        leads: recentLeads,
        blogs: recentBlogs
      }
    });
  } catch (error) {
    next(error);
  }
};