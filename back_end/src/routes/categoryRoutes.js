const express = require('express');
const { createCategory, getCategories, deleteCategory } = require('../controllers/categoryController');
const authenticate = require('../middleware/auth');

const router = express.Router();

router.use(authenticate);

router.post('/', createCategory);
router.get('/categories', getCategories);
router.delete('/:id', deleteCategory);

module.exports = router;