const express = require('express');
const {
  register,
  login,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');
const asyncHandler = require('../middleware/asyncHandler');
const validate = require('../middleware/validate');
const { authLimiter } = require('../middleware/rateLimit');

const router = express.Router();

router.post(
  '/register',
  authLimiter,
  validate({
    body: {
      name: [{ required: true }, { type: 'string' }, { minLength: 2 }],
      email: [{ required: true }, { type: 'string' }],
      password: [{ required: true }, { type: 'string' }, { minLength: 6 }],
    },
  }),
  asyncHandler(register)
);

router.post(
  '/login',
  authLimiter,
  validate({
    body: {
      email: [{ required: true }, { type: 'string' }],
      password: [{ required: true }, { type: 'string' }],
    },
  }),
  asyncHandler(login)
);

router.post(
  '/forgot-password',
  authLimiter,
  validate({
    body: {
      email: [{ required: true }, { type: 'string' }],
    },
  }),
  asyncHandler(forgotPassword)
);

router.post(
  '/reset-password',
  authLimiter,
  validate({
    body: {
      email: [{ required: true }, { type: 'string' }],
      token: [{ required: true }, { type: 'string' }],
      newPassword: [{ required: true }, { type: 'string' }, { minLength: 6 }],
    },
  }),
  asyncHandler(resetPassword)
);

module.exports = router;
