const Manufacturer = require('../models/Manufacturer');
const Category = require('../models/Category');
const axios = require('axios');


const getModels = async (req, res, next) => {
  try {
    const ManufacturerFound = await Manufacturer.findById(req.params.manufacturer_id);
    
    if (!ManufacturerFound) {
      return res.status(404).json({ message: 'Manufacturer not found' });
    }

   const CategoryFound = await Category.findById(ManufacturerFound.category._id);

   if (!CategoryFound) {
      return res.status(404).json({ message: 'Category not found' });
    }


    let models= [];
  
  if(CategoryFound.category ==="Vehicles"){
        const year = req.body.year;

        


        const result = await axios.get(`https://api.nhtsa.gov/SafetyRatings/modelyear/${year}/make/${ManufacturerFound.manufacturer}`,{});
        const data =result.data.Results;
        console.log(data);
      for (const row in  data){
        console.log(data[row]);
        
            const model = {Model : data[row].Model };
            models.push(model);

       }
      }


      res.json({
      success: true,
      data: models
       });
    
    
    
 
  } catch (error) {
    next(error);
  }
};


module.exports = { getModels };