const WebsiteContent = require('../models/WebsiteContent.model');

exports.getPageContent = async (req, res, next) => {
  try {
    const { page } = req.params;
    const content = await WebsiteContent.find({ page });
    
    const formattedContent = {};
    content.forEach(item => {
      formattedContent[item.section] = item.content;
    });
    
    res.status(200).json({
      status: 'success',
      data: formattedContent
    });
  } catch (error) {
    next(error);
  }
};

exports.updateContent = async (req, res, next) => {
  try {
    const { page, section } = req.params;
    const { content } = req.body;
    
    const updatedContent = await WebsiteContent.findOneAndUpdate(
      { page, section },
      { 
        content,
        updatedBy: req.user._id
      },
      { upsert: true, new: true, runValidators: true }
    );
    
    res.status(200).json({
      status: 'success',
      data: updatedContent
    });
  } catch (error) {
    next(error);
  }
};