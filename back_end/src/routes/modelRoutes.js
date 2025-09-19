const express = require('express');
const { getModels } = require('../controllers/modelController');
const authenticate = require('../middleware/auth');

const router = express.Router();

router.use(authenticate);

router.get('/:manufacturer_id',getModels );


module.exports = router;