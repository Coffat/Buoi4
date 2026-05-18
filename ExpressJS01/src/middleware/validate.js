const { fail } = require('../utils/apiResponse');

const validateField = (field, value, rules, errors) => {
  for (const rule of rules) {
    if (rule.required && (value === undefined || value === null || value === '')) {
      errors.push(`${field} là bắt buộc`);
      break;
    }
    if (value !== undefined && value !== null && value !== '') {
      if (rule.type === 'string' && typeof value !== 'string') {
        errors.push(`${field} phải là chuỗi`);
      }
      if (rule.type === 'number') {
        const num = Number(value);
        if (Number.isNaN(num)) {
          errors.push(`${field} phải là số hợp lệ`);
        }
      }
      if (rule.minLength && String(value).length < rule.minLength) {
        errors.push(`${field} phải có ít nhất ${rule.minLength} ký tự`);
      }
      if (rule.maxLength && String(value).length > rule.maxLength) {
        errors.push(`${field} không được vượt quá ${rule.maxLength} ký tự`);
      }
      if (rule.enum && !rule.enum.includes(value)) {
        errors.push(`${field} không hợp lệ`);
      }
    }
  }
};

const validate = (schema) => (req, res, next) => {
  const errors = [];

  if (schema.body) {
    for (const [field, rules] of Object.entries(schema.body)) {
      validateField(field, req.body[field], rules, errors);
    }
  }

  if (schema.query) {
    for (const [field, rules] of Object.entries(schema.query)) {
      validateField(field, req.query[field], rules, errors);
    }
  }

  if (errors.length > 0) {
    return fail(res, 400, 'VALIDATION_ERROR', errors.join('; '), errors);
  }

  next();
};

module.exports = validate;
