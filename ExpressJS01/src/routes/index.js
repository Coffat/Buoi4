const express = require('express');
const auth = require('../middleware/auth');
const { apiLimiter } = require('../middleware/rateLimit');
const healthRoutes = require('./health.routes');
const authRoutes = require('./auth.routes');
const usersRoutes = require('./users.routes');
const productsRoutes = require('./products.routes');
const categoriesRoutes = require('./categories.routes');

const router = express.Router();

router.use(auth);
router.use(healthRoutes);
router.use('/auth', authRoutes);
router.use(apiLimiter);
router.use('/users', usersRoutes);
router.use('/products', productsRoutes);
router.use('/categories', categoriesRoutes);

module.exports = router;
