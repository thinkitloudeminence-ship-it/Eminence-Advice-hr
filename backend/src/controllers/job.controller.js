const Job = require('../models/Job.model');

exports.getAllJobs = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, category, jobType, location, search } = req.query;
    
    let query = { status: 'active' };
    
    if (category) query.category = category;
    if (jobType) query.jobType = jobType;
    if (location) query.location = { $regex: location, $options: 'i' };
    if (search) {
      query.$text = { $search: search };
    }
    
    const jobs = await Job.find(query)
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('postedBy', 'name email');
    
    const total = await Job.countDocuments(query);
    
    res.status(200).json({
      status: 'success',
      results: jobs.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
      data: jobs
    });
  } catch (error) {
    next(error);
  }
};

exports.getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id).populate('postedBy', 'name email');
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    job.views += 1;
    await job.save();
    
    res.status(200).json({
      status: 'success',
      data: job
    });
  } catch (error) {
    next(error);
  }
};

exports.createJob = async (req, res, next) => {
  try {
    req.body.postedBy = req.user._id;
    const job = await Job.create(req.body);
    
    res.status(201).json({
      status: 'success',
      data: job
    });
  } catch (error) {
    next(error);
  }
};

exports.updateJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    res.status(200).json({
      status: 'success',
      data: job
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(error);
  }
};