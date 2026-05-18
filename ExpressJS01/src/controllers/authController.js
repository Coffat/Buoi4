const { ok, created } = require('../utils/apiResponse');
const {
  createUserService,
  loginService,
  requestPasswordResetService,
  resetPasswordWithTokenService,
} = require('../services/userService');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await createUserService(name, email, password);
  return created(res, user);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const data = await loginService(email, password);
  return ok(res, data);
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const data = await requestPasswordResetService(email);
  return ok(res, data);
};

const resetPassword = async (req, res) => {
  const { email, token, newPassword } = req.body;
  const data = await resetPasswordWithTokenService(email, token, newPassword);
  return ok(res, data);
};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
};
