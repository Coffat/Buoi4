const express = require('express');
const { getMe, listUsers, updateMe } = require('../controllers/usersController');
const asyncHandler = require('../middleware/asyncHandler');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');

const router = express.Router();

router.get('/me', asyncHandler(getMe));

router.patch(
  '/me',
  validate({
    body: {
      name: [{ type: 'string' }, { minLength: 2 }],
    },
  }),
  asyncHandler(updateMe)
);

router.get('/', authorize('Admin'), asyncHandler(listUsers));

module.exports = router;
