const Job = require('../models/Job.model');
const slugify = require('slugify');

exports.getAllJobs = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, category, jobType, location, search } = req.query;
    
    let query = { status: 'active' };
    if (category) query.category = category;
    if (jobType) query.jobType = jobType;
    if (location) query.location = { $regex: location, $options: 'i' };
    if (search) query.$text = { $search: search };
    
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

exports.getAllJobsAdmin = async (req, res, next) => {
  try {
    const jobs = await Job.find()
      .sort('-createdAt')
      .populate('postedBy', 'name email');
    
    res.status(200).json({
      status: 'success',
      results: jobs.length,
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
    
    await Job.updateOne({ _id: job._id }, { $inc: { views: 1 } });
    
    res.status(200).json({
      status: 'success',
      data: job
    });
  } catch (error) {
    next(error);
  }
};

// ✅ Get job by slug (for public view)
exports.getJobBySlug = async (req, res, next) => {
  try {
    const job = await Job.findOne({ slug: req.params.slug, status: 'active' })
      .populate('postedBy', 'name email');
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    await Job.updateOne({ _id: job._id }, { $inc: { views: 1 } });
    
    res.status(200).json({
      status: 'success',
      data: job
    });
  } catch (error) {
    next(error);
  }
};

// ✅ CREATE JOB - with slug generation
exports.createJob = async (req, res, next) => {
  try {
    const jobData = { ...req.body };
    jobData.postedBy = req.user._id;
    
    // ✅ Generate slug from title
    if (jobData.title) {
      let baseSlug = slugify(jobData.title, { lower: true, strict: true });
      let slug = baseSlug;
      let counter = 1;
      
      // Check if slug already exists
      while (await Job.findOne({ slug })) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
      jobData.slug = slug;
    }
    
    // Parse arrays if sent as strings
    ['skills', 'responsibilities', 'requirements', 'benefits'].forEach(field => {
      if (jobData[field] && typeof jobData[field] === 'string') {
        jobData[field] = jobData[field].split(',').map(s => s.trim()).filter(Boolean);
      }
    });

    // Parse nested objects if sent as strings
    if (jobData.salary && typeof jobData.salary === 'string') {
      jobData.salary = JSON.parse(jobData.salary);
    }
    if (jobData.experience && typeof jobData.experience === 'string') {
      jobData.experience = JSON.parse(jobData.experience);
    }
    
    const job = await Job.create(jobData);
    
    res.status(201).json({
      status: 'success',
      data: job
    });
  } catch (error) {
    next(error);
  }
};

// ✅ UPDATE JOB - with slug regeneration
exports.updateJob = async (req, res, next) => {
  try {
    const jobData = { ...req.body };
    
    // ✅ Regenerate slug if title changed
    if (jobData.title) {
      let baseSlug = slugify(jobData.title, { lower: true, strict: true });
      let slug = baseSlug;
      let counter = 1;
      
      // Check if slug already exists for other jobs
      let existingJob = await Job.findOne({ slug, _id: { $ne: req.params.id } });
      while (existingJob) {
        slug = `${baseSlug}-${counter}`;
        counter++;
        existingJob = await Job.findOne({ slug, _id: { $ne: req.params.id } });
      }
      jobData.slug = slug;
    }
    
    ['skills', 'responsibilities', 'requirements', 'benefits'].forEach(field => {
      if (jobData[field] && typeof jobData[field] === 'string') {
        jobData[field] = jobData[field].split(',').map(s => s.trim()).filter(Boolean);
      }
    });

    if (jobData.salary && typeof jobData.salary === 'string') {
      jobData.salary = JSON.parse(jobData.salary);
    }
    if (jobData.experience && typeof jobData.experience === 'string') {
      jobData.experience = JSON.parse(jobData.experience);
    }
    
    const job = await Job.findByIdAndUpdate(req.params.id, jobData, {
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
    
    res.status(204).json({ status: 'success', data: null });
  } catch (error) {
    next(error);
  }
};