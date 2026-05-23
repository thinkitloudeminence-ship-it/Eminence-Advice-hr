const SEOSetting = require('../models/SEOSetting.model');

exports.getSeoSettings = async (req, res, next) => {
  try {
    const { page } = req.params;
    let seo = await SEOSetting.findOne({ page });
    
    if (!seo) {
      seo = {
        page,
        metaTitle: `Eminance Advice - ${page.charAt(0).toUpperCase() + page.slice(1)}`,
        metaDescription: `Professional HR services and career guidance for ${page}`,
        keywords: ['career', 'jobs', 'placement', 'training']
      };
    }
    
    res.status(200).json({
      status: 'success',
      data: seo
    });
  } catch (error) {
    next(error);
  }
};

exports.updateSeoSettings = async (req, res, next) => {
  try {
    const { page } = req.params;
    
    const seo = await SEOSetting.findOneAndUpdate(
      { page },
      req.body,
      { upsert: true, new: true, runValidators: true }
    );
    
    res.status(200).json({
      status: 'success',
      data: seo
    });
  } catch (error) {
    next(error);
  }
};