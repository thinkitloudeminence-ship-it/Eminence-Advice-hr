const Service = require('../models/Service.model');

exports.getAllServices = async (req, res, next) => {
  try {
    const { category } = req.query;
    let query = { isActive: true };
    if (category) query.category = category;
    
    const services = await Service.find(query).sort('order');
    
    res.status(200).json({
      status: 'success',
      results: services.length,
      data: services
    });
  } catch (error) {
    next(error);
  }
};

exports.getServiceById = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    res.status(200).json({
      status: 'success',
      data: service
    });
  } catch (error) {
    next(error);
  }
};

exports.createService = async (req, res, next) => {
  try {
    const service = await Service.create(req.body);
    
    res.status(201).json({
      status: 'success',
      data: service
    });
  } catch (error) {
    next(error);
  }
};

exports.updateService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    res.status(200).json({
      status: 'success',
      data: service
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(error);
  }
};