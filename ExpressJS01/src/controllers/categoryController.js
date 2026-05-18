const { ok, created, fail } = require('../utils/apiResponse');
const categoryService = require('../services/categoryService');

const getCategories = async (req, res) => {
  const data = await categoryService.getCategories();
  if (!data) {
    return fail(res, 500, 'INTERNAL_ERROR', 'Lỗi server');
  }
  return ok(res, data);
};

const createCategory = async (req, res) => {
  const { name, description } = req.body;
  const category = await categoryService.createCategory(name, description);
  if (!category) {
    return fail(res, 400, 'VALIDATION_ERROR', 'Tạo danh mục thất bại');
  }
  return created(res, category, `/v1/api/categories/${category.slug}`);
};

module.exports = {
  getCategories,
  createCategory,
};
