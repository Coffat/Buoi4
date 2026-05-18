const express = require('express');
const { getCategories, createCategory } = require('../controllers/categoryController');
const asyncHandler = require('../middleware/asyncHandler');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');

const router = express.Router();

router.get('/', asyncHandler(getCategories));

router.post(
  '/',
  authorize('Admin'),
  validate({
    body: {
      name: [{ required: true }, { type: 'string' }, { minLength: 2 }],
      description: [{ type: 'string' }],
    },
  }),
  asyncHandler(createCategory)
);

module.exports = router;
