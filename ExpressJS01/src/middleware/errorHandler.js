const { fail } = require('../utils/apiResponse');

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  console.error(err);

  if (err.status && err.code) {
    return fail(res, err.status, err.code, err.message, err.details || []);
  }

  return fail(res, 500, 'INTERNAL_ERROR', 'Lỗi server', []);
};

module.exports = errorHandler;
