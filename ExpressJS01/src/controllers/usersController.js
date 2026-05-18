const { ok } = require('../utils/apiResponse');
const { getUserService, updateProfileService } = require('../services/userService');

const getMe = async (req, res) => {
  return ok(res, {
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
  });
};

const listUsers = async (req, res) => {
  const users = await getUserService();
  return ok(res, users);
};

const updateMe = async (req, res) => {
  const email = req.user?.email;
  const { name, newPassword } = req.body;
  const data = await updateProfileService(email, name, newPassword);
  return ok(res, data);
};

module.exports = {
  getMe,
  listUsers,
  updateMe,
};
