const rateLimit = require('express-rate-limit');

const RATE_LIMIT_MESSAGE = {
  message: 'Quá nhiều yêu cầu, vui lòng thử lại sau 15 phút',
};

const baseOptions = {
  windowMs: 15 * 60 * 1000,
  standardHeaders: true,
  legacyHeaders: false,
  message: RATE_LIMIT_MESSAGE,
};

/** Đăng nhập, đăng ký, quên/đặt lại mật khẩu — giới hạn chặt */
const authLimiter = rateLimit({
  ...baseOptions,
  max: 100,
});

/** Sản phẩm, danh mục, profile… — giới hạn thoáng hơn */
const apiLimiter = rateLimit({
  ...baseOptions,
  max: process.env.NODE_ENV === 'production' ? 500 : 1000,
});

module.exports = { authLimiter, apiLimiter };
