const express = require('express');
const { createManufacturer, getManufacturers, createManufacturers } = require('../controllers/manufacturerController');
const authenticate = require('../middleware/auth');

const router = express.Router();

router.use(authenticate);

router.post('/', createManufacturer);
router.post('/manufacturers', createManufacturers);
router.get('/',getManufacturers );
router.get('/category/:category_id',getManufacturers );

module.exports = router;