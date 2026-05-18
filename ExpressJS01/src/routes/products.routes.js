const express = require('express');
const {
  getProducts,
  getProductDetail,
  getSimilarProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const asyncHandler = require('../middleware/asyncHandler');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');

const router = express.Router();

router.get('/', asyncHandler(getProducts));

router.post(
  '/',
  authorize('Admin'),
  validate({
    body: {
      name: [{ required: true }, { type: 'string' }, { minLength: 2 }],
      price: [{ required: true }, { type: 'number' }],
      stock: [{ type: 'number' }],
      status: [{ enum: ['normal', 'new', 'promotion', 'best_seller', 'featured'] }],
    },
  }),
  asyncHandler(createProduct)
);

router.get('/:slug/similar', asyncHandler(getSimilarProducts));
router.get('/:slug', asyncHandler(getProductDetail));

router.patch('/:slug', authorize('Admin'), asyncHandler(updateProduct));
router.delete('/:slug', authorize('Admin'), asyncHandler(deleteProduct));

module.exports = router;
