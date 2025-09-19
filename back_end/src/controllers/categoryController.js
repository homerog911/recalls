const Category = require('../models/Category');


const createCategory = async (req, res, next) => {
  try {
    const { category } = req.body;
    
    const CategoryNew = await Category.create({
     category
    });
    console.log(category);

    res.status(201).json({
      success: true,
      data: CategoryNew
    });
  } catch (error) {
    next(error);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    
    if (status) query.status = status;
    const query = {};

    const Categories = await Category.find(query)
      .populate('category', 'category')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Category.countDocuments(query);

    res.json({
      success: true,
      data: Categories,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const CategoryDelete = await Category.findById(req.params.id);
    
    if (!CategoryDelete) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await Category.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'Category removed successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createCategory, getCategories, deleteCategory };