const Manufacturer = require('../models/Manufacturer');
const Category = require('../models/Category');
const axios = require('axios');


const getRecalls = async (req, res, next) => {
  try {
    const ManufacturerFound = await Manufacturer.findById(req.params.manufacturer_id);
    
    if (!ManufacturerFound) {
      return res.status(404).json({ message: 'Manufacturer not found' });
    }

   const CategoryFound = await Category.findById(ManufacturerFound.category._id);

   if (!CategoryFound) {
      return res.status(404).json({ message: 'Category not found' });
    }


    let recalls= [];
  
    if(CategoryFound.category ==="Electronics") {
      const result = await axios.get('https://www.saferproducts.gov/RestWebServices/Recall', {
        params: {
          format: 'json',
          ProductType: CategoryFound.category,
          Manufacturer: ManufacturerFound.manufacturer,
        }
       
      });
      const data =result.data;
      let i=0;
       for (const row in  data){

        
            const recall = {RecallDate : data[row].RecallDate,
              Title:data[row].Title,
              Description:data[row].Description,
              Model:data[row].Products[0].Name,
              Manufacturer:data[row].Manufacturers[0].Name,
              Hazards:data[row].Hazards[0].Name,
              Remedies:data[row].Remedies[0].Name
            };
            recalls.push(recall);

       }

      }else if(CategoryFound.category ==="Vehicles"){
        const model = req.params.model;
        const year = req.params.year;
  

        const result = await axios.get('https://api.nhtsa.gov/recalls/recallsByVehicle', {
        params: {
          format: 'json',
          make: ManufacturerFound.manufacturer,
          model : model,
          modelYear : year
        }
        
      });
        const data =result.data.results;
      for (const row in  data){

        
            const recall = {RecallDate : data[row].RecallDate,
              Title:data[row].Component,
              Description:data[row].Summary,
              Model: `${data[row].Model}  ${year}`,
              Manufacturer:data[row].Manufacturer,
              Hazards:data[row].Consequence,
              Remedies:data[row].Remedy
             };
            recalls.push(recall);

       }
      }

      console.log(recalls);

      res.json({
      success: true,
      data: recalls
       });
    
    
    
 
  } catch (error) {
    next(error);
  }
};


module.exports = { getRecalls };