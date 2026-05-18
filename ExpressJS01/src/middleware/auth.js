require('dotenv').config();
const jwt = require('jsonwebtoken');

const normalizePath = (url) => {
  const pathOnly = url.split('?')[0];
  if (pathOnly.length > 1 && pathOnly.endsWith('/')) {
    return pathOnly.slice(0, -1);
  }
  return pathOnly;
};

const PUBLIC_API_PATHS = [
  '/v1/api/health',
  '/v1/api/auth/register',
  '/v1/api/auth/login',
  '/v1/api/auth/forgot-password',
  '/v1/api/auth/reset-password',
];

const PUBLIC_API_PREFIXES = ['/v1/api/products', '/v1/api/categories'];

const auth = (req, res, next) => {
  const path = normalizePath(req.originalUrl);
  const isPublic =
    PUBLIC_API_PATHS.includes(path) ||
    PUBLIC_API_PREFIXES.some((prefix) => path.startsWith(prefix));

  if (isPublic) {
    return next();
  }

  const bearer = req.headers?.authorization?.split(' ')?.[1];
  if (bearer) {
    try {
      const decoded = jwt.verify(bearer, process.env.JWT_SECRET);
      req.user = {
        email: decoded.email,
        name: decoded.name,
        role: decoded.role || 'User',
      };
      next();
    } catch (error) {
      const { fail } = require('../utils/apiResponse');
      return fail(res, 401, 'UNAUTHORIZED', 'Token bị hết hạn/hoặc không hợp lệ');
    }
  } else {
    const { fail } = require('../utils/apiResponse');
    return fail(
      res,
      401,
      'UNAUTHORIZED',
      'Bạn chưa truyền Access Token ở header/Hoặc token bị hết hạn'
    );
  }
};

module.exports = auth;
