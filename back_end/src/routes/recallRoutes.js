const express = require('express');
const { getRecalls } = require('../controllers/recallController');
const authenticate = require('../middleware/auth');

const router = express.Router();

router.use(authenticate);

router.get('/manufacturer/:manufacturer_id/model/:model/modelyear/:year',getRecalls );
router.get('/manufacturer/:manufacturer_id',getRecalls );


module.exports = router;