const validate = (schema) => {
  return (req, res, next) => {
    const errors = [];
    if (schema.body) {
      for (const [field, rules] of Object.entries(schema.body)) {
        const value = req.body[field];
        for (const rule of rules) {
          if (rule.required && (value === undefined || value === null || value === '')) {
            errors.push(`${field} là bắt buộc`);
            break;
          }
          if (value !== undefined && value !== null && value !== '') {
            if (rule.type === 'string' && typeof value !== 'string') {
              errors.push(`${field} phải là chuỗi`);
            }
            if (rule.type === 'number' && (isNaN(value) || Number(value) < 0)) {
              errors.push(`${field} phải là số hợp lệ`);
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
      }
    }
    if (errors.length > 0) {
      return res.status(400).json({ message: errors.join('; ') });
    }
    next();
  };
};

module.exports = validate;
