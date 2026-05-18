const { fail } = require('../utils/apiResponse');

const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return fail(res, 401, 'UNAUTHORIZED', 'Chưa xác thực');
    }
    if (!allowedRoles.includes(req.user.role)) {
      return fail(res, 403, 'FORBIDDEN', 'Bạn không có quyền truy cập');
    }
    next();
  };
};

module.exports = authorize;
