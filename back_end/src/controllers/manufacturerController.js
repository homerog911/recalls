const Manufacturer = require('../models/Manufacturer');
const Category = require('../models/Category')



const createManufacturer = async (req, res, next) => {
  try {
    const {category_id, manufacturer } = req.body;

   // const CategoryFound = Category.findById(req.body.id);
   
    // Create  record
    const manufacturerNew = await Manufacturer.create({
      category: category_id,
      manufacturer: manufacturer
    });

   
    res.status(201).json({
      success: true,
      data: manufacturerNew
    });
  } catch (error) {
    next(error);
  }
};

const createManufacturers = async (req, res, next) => {
  try {
    const {data} = req.body;
     let manufacturers = [];
   // const CategoryFound = Category.findById(req.body.id);
    Array.from(data).map(async (row) => {
      const manufacturerNew = await Manufacturer.create({
      category: row.category_id,
      manufacturer: row.manufacturer
    });
    manufacturers.push(manufacturerNew);
    })
     console.log(manufacturers);
    res.status(201).json({
      success: true,
      data:  JSON.stringify(manufacturers)
    });
  } catch (error) {
    next(error);
  }
};

const getManufacturers = async (req, res, next) => {
  try {
    const { page = 1, limit = 100 } = req.query;
    console.log(req.params.category_id);

const query = { category: req.params.category_id };
  //  const query = {'category':req.params.category_id };

    const manufacturers = await Manufacturer.find(query)
      .populate('category', 'category')
      .populate('manufacturer', 'manufacturer')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ manufacturer: 1 });

    const total = await Manufacturer.countDocuments(query);

    res.json({
      success: true,
      data: manufacturers,
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

module.exports = { createManufacturer, getManufacturers, createManufacturers };