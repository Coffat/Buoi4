const categoryService = require('../services/categoryService');

const getCategories = async (req, res) => {
  const data = await categoryService.getCategories();
  if (!data) {
    return res.status(500).json({ message: 'Lỗi server' });
  }
  return res.status(200).json(data);
};

module.exports = { getCategories };
