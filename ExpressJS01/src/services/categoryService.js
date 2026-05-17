const Category = require('../models/category');

const toSlug = (str) =>
  str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const getCategories = async () => {
  try {
    const categories = await Category.findAll({
      attributes: ['id', 'name', 'slug', 'description'],
      order: [['name', 'ASC']],
    });
    return categories;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createCategory = async (name, description) => {
  try {
    const slug = toSlug(name);
    const category = await Category.create({ name, slug, description });
    return category;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = { getCategories, createCategory };
