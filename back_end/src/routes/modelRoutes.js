const express = require('express');
const { getModels } = require('../controllers/modelController');
const authenticate = require('../middleware/auth');

const router = express.Router();

router.use(authenticate);

router.get('/manufacturer/:manufacturer_id/modelyear/:year',getModels );


module.exports = router;