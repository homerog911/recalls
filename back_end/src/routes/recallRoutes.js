const express = require('express');
const { getRecalls } = require('../controllers/recallController');
const authenticate = require('../middleware/auth');

const router = express.Router();

router.use(authenticate);

router.get('/:manufacturer_id',getRecalls );


module.exports = router;