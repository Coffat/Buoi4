require('dotenv').config();
const crypto = require('crypto');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

const toPublicUser = (user) => {
  const o = user.toJSON();
  delete o.password;
  delete o.resetPasswordToken;
  delete o.resetPasswordExpires;
  return {
    id: o.id,
    name: o.name,
    email: o.email,
    role: o.role,
    createdAt: o.createdAt,
    updatedAt: o.updatedAt,
  };
};

const signToken = (user) =>
  jwt.sign(
    { email: user.email, name: user.name, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );

const createUserService = async (name, email, password) => {
  const existing = await User.findOne({ where: { email } });
  if (existing) {
    const err = new Error('Email đã được sử dụng');
    err.status = 409;
    err.code = 'CONFLICT';
    throw err;
  }
  const hashPassword = await bcrypt.hash(password, saltRounds);
  const user = await User.create({
    name,
    email,
    password: hashPassword,
    role: 'User',
  });
  return toPublicUser(user);
};

const loginService = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    const err = new Error('Email hoặc mật khẩu không đúng');
    err.status = 401;
    err.code = 'UNAUTHORIZED';
    throw err;
  }
  const isMatchPassword = await bcrypt.compare(password, user.password);
  if (!isMatchPassword) {
    const err = new Error('Email hoặc mật khẩu không đúng');
    err.status = 401;
    err.code = 'UNAUTHORIZED';
    throw err;
  }
  return {
    access_token: signToken(user),
    user: {
      email: user.email,
      name: user.name,
      role: user.role,
    },
  };
};

const hashResetToken = (tokenPlain) =>
  crypto.createHash('sha256').update(tokenPlain).digest('hex');

const RESET_GENERIC_MESSAGE =
  'Nếu email đã đăng ký trong hệ thống, bạn sẽ nhận hướng dẫn đặt lại mật khẩu.';

const requestPasswordResetService = async (email) => {
  if (!email || typeof email !== 'string') {
    return { message: RESET_GENERIC_MESSAGE };
  }
  const user = await User.findOne({ where: { email: email.trim() } });
  if (!user) {
    return { message: RESET_GENERIC_MESSAGE };
  }
  const tokenPlain = crypto.randomBytes(32).toString('hex');
  const tokenHash = hashResetToken(tokenPlain);
  const expires = new Date(Date.now() + 60 * 60 * 1000);
  await user.update({
    resetPasswordToken: tokenHash,
    resetPasswordExpires: expires,
  });
  if (process.env.NODE_ENV === 'development') {
    const base = process.env.FRONTEND_URL || 'http://localhost:5173';
    const q = new URLSearchParams({
      email: user.email,
      token: tokenPlain,
    });
    console.log('[dev] Reset password URL:', `${base}/reset-password?${q.toString()}`);
  }
  return { message: RESET_GENERIC_MESSAGE };
};

const resetPasswordWithTokenService = async (email, tokenPlain, newPassword) => {
  if (!email || !tokenPlain || !newPassword) {
    const err = new Error('Thiếu thông tin');
    err.status = 400;
    err.code = 'VALIDATION_ERROR';
    throw err;
  }
  const tokenHash = hashResetToken(tokenPlain);
  const user = await User.findOne({
    where: {
      email: email.trim(),
      resetPasswordToken: tokenHash,
    },
  });
  if (
    !user ||
    !user.resetPasswordExpires ||
    user.resetPasswordExpires < new Date()
  ) {
    const err = new Error('Token không hợp lệ hoặc đã hết hạn');
    err.status = 400;
    err.code = 'VALIDATION_ERROR';
    throw err;
  }
  const hashPassword = await bcrypt.hash(newPassword, saltRounds);
  await user.update({
    password: hashPassword,
    resetPasswordToken: null,
    resetPasswordExpires: null,
  });
  return { message: 'Đặt lại mật khẩu thành công' };
};

const getUserService = async () => {
  const rows = await User.findAll({
    attributes: {
      exclude: ['password', 'resetPasswordToken', 'resetPasswordExpires'],
    },
    order: [['createdAt', 'DESC']],
  });
  return rows.map(toPublicUser);
};

const updateProfileService = async (email, name, newPassword) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    const err = new Error('Người dùng không tồn tại');
    err.status = 404;
    err.code = 'NOT_FOUND';
    throw err;
  }

  const updates = {};
  if (name) updates.name = name;
  if (newPassword) {
    updates.password = await bcrypt.hash(newPassword, saltRounds);
  }

  await user.update(updates);
  await user.reload();

  return {
    access_token: signToken(user),
    user: {
      email: user.email,
      name: user.name,
      role: user.role,
    },
  };
};

module.exports = {
  createUserService,
  loginService,
  getUserService,
  requestPasswordResetService,
  resetPasswordWithTokenService,
  updateProfileService,
  toPublicUser,
};
