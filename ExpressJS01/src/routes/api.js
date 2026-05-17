const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const {
  createUser,
  handleLogin,
  getUser,
  getAccount,
  forgotPassword,
  resetPassword,
  updateProfile,
} = require('../controllers/userController');
const {
  getProducts,
  getProductDetail,
  getSimilarProducts,
  createProduct,
} = require('../controllers/productController');
const { getCategories } = require('../controllers/categoryController');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');
const delay = require('../middleware/delay');

const routerAPI = express.Router();

routerAPI.all('*', auth);

routerAPI.get('/', (req, res) => {
  let name = '';
  const bearer = req.headers.authorization?.split(' ')?.[1];
  if (bearer) {
    try {
      const decoded = jwt.verify(bearer, process.env.JWT_SECRET);
      name = decoded.name || '';
    } catch (e) {
      /* ignore — public hello */
    }
  }
  const msg = name
    ? `${name}! Hello world! HomePage API`
    : 'Hello world api';
  return res.status(200).json(msg);
});

routerAPI.post('/register', createUser);
routerAPI.post('/login', handleLogin);
routerAPI.post('/forgot-password', forgotPassword);
routerAPI.post('/reset-password', resetPassword);
routerAPI.get('/user', getUser);
routerAPI.get('/account', delay, getAccount);
routerAPI.put('/user/profile', updateProfile);

routerAPI.get('/products', getProducts);
routerAPI.get('/products/:slug', getProductDetail);
routerAPI.get('/products/:slug/similar', getSimilarProducts);
routerAPI.post(
  '/products',
  authorize('Admin'),
  validate({
    body: {
      name: [{ required: true }, { type: 'string' }, { minLength: 2 }],
      price: [{ required: true }, { type: 'number' }],
      stock: [{ type: 'number' }],
      status: [{ enum: ['normal', 'new', 'promotion', 'best_seller'] }],
    },
  }),
  createProduct
);

routerAPI.get('/categories', getCategories);

module.exports = routerAPI;
