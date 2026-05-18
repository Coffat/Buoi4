const { Op } = require('sequelize');
const Product = require('../models/product');
const ProductImage = require('../models/productImage');
const Category = require('../models/category');

const toSlug = (str) =>
  str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const productIncludes = () => [
  {
    model: Category,
    as: 'category',
    attributes: ['id', 'name', 'slug'],
  },
  {
    model: ProductImage,
    as: 'images',
    attributes: ['id', 'image_url', 'is_primary', 'sort_order'],
    order: [['sort_order', 'ASC']],
  },
];

const toPublicProduct = (product) => {
  const p = product.toJSON();
  if (p.images) {
    p.primary_image =
      p.images.find((img) => img.is_primary)?.image_url ||
      p.images[0]?.image_url ||
      null;
  }
  p.discount_percent =
    p.original_price && Number(p.original_price) > Number(p.price)
      ? Math.round(
          ((Number(p.original_price) - Number(p.price)) /
            Number(p.original_price)) *
            100
        )
      : 0;
  return p;
};

const buildOrder = (sort, order) => {
  const sortMap = {
    created_at: 'createdAt',
    price: 'price',
    mileage: 'mileage',
  };
  const field = sortMap[sort] || 'createdAt';
  const direction = order === 'asc' ? 'ASC' : 'DESC';
  return [[field, direction]];
};

const getProducts = async ({
  status,
  category_slug,
  page = 1,
  limit = 8,
  search,
  price_min,
  price_max,
  brand,
  year_min,
  year_max,
  fuel_type,
  transmission,
  mileage_max,
  location,
  sort,
  order,
}) => {
  const where = { is_active: true };
  if (status) where.status = status;
  if (brand) where.brand = brand;
  if (fuel_type) where.fuel_type = fuel_type;
  if (transmission) where.transmission = transmission;
  if (location) where.location = location;

  if (search) {
    where.name = { [Op.like]: `%${search}%` };
  }

  if (price_min || price_max) {
    where.price = {};
    if (price_min) where.price[Op.gte] = price_min;
    if (price_max) where.price[Op.lte] = price_max;
  }

  if (year_min || year_max) {
    where.year = {};
    if (year_min) where.year[Op.gte] = year_min;
    if (year_max) where.year[Op.lte] = year_max;
  }

  if (mileage_max) {
    where.mileage = { [Op.lte]: mileage_max };
  }

  if (category_slug) {
    const category = await Category.findOne({
      where: { slug: category_slug },
    });
    if (category) where.category_id = category.id;
  }

  const includes = productIncludes();
  const total = await Product.count({
    where,
    include: includes,
    distinct: true,
    col: 'id',
  });

  const totalPages = total > 0 ? Math.ceil(total / limit) : 1;
  const safePage = Math.min(Math.max(1, page), totalPages);
  const offset = (safePage - 1) * limit;

  const rows = await Product.findAll({
    where,
    include: includes,
    order: buildOrder(sort, order),
    offset,
    limit,
  });

  return {
    items: rows.map(toPublicProduct),
    meta: {
      page: safePage,
      limit,
      total,
      totalPages,
      hasNext: safePage < totalPages,
      hasPrev: safePage > 1,
    },
  };
};

const getProductBySlug = async (slug) => {
  const product = await Product.findOne({
    where: { slug, is_active: true },
    include: productIncludes(),
  });
  if (!product) return null;
  await product.increment('views', { by: 1 });
  return toPublicProduct(product);
};

const getSimilarProducts = async (slug, limit = 4) => {
  const product = await Product.findOne({
    where: { slug },
    attributes: ['category_id', 'id'],
  });
  if (!product) return [];
  const products = await Product.findAll({
    where: {
      category_id: product.category_id,
      id: { [Op.ne]: product.id },
      is_active: true,
    },
    include: productIncludes(),
    limit,
  });
  return products.map(toPublicProduct);
};

const createProduct = async (data) => {
  const slug = toSlug(data.name);
  const product = await Product.create({ ...data, slug });
  const full = await Product.findByPk(product.id, {
    include: productIncludes(),
  });
  return toPublicProduct(full);
};

const updateProductBySlug = async (slug, data) => {
  const product = await Product.findOne({ where: { slug, is_active: true } });
  if (!product) return null;

  const updates = { ...data };
  if (updates.name) {
    updates.slug = toSlug(updates.name);
  }
  await product.update(updates);

  const full = await Product.findByPk(product.id, {
    include: productIncludes(),
  });
  return toPublicProduct(full);
};

const deleteProductBySlug = async (slug) => {
  const product = await Product.findOne({ where: { slug, is_active: true } });
  if (!product) return false;
  await product.update({ is_active: false });
  return true;
};

module.exports = {
  getProducts,
  getProductBySlug,
  getSimilarProducts,
  createProduct,
  updateProductBySlug,
  deleteProductBySlug,
};
