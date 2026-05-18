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

const getProducts = async ({
  status,
  category_slug,
  page = 1,
  limit = 8,
  search,
  priceMin,
  priceMax,
  brand,
  yearMin,
  yearMax,
  fuel_type,
  transmission,
  mileageMax,
  location,
  sort,
}) => {
  try {
    const where = { is_active: true };
    if (status) where.status = status;
    if (brand) where.brand = brand;
    if (fuel_type) where.fuel_type = fuel_type;
    if (transmission) where.transmission = transmission;
    if (location) where.location = location;

    if (search) {
      where.name = { [Op.like]: `%${search}%` };
    }

    if (priceMin || priceMax) {
      where.price = {};
      if (priceMin) where.price[Op.gte] = priceMin;
      if (priceMax) where.price[Op.lte] = priceMax;
    }

    if (yearMin || yearMax) {
      where.year = {};
      if (yearMin) where.year[Op.gte] = yearMin;
      if (yearMax) where.year[Op.lte] = yearMax;
    }

    if (mileageMax) {
      where.mileage = { [Op.lte]: mileageMax };
    }

    if (category_slug) {
      const category = await Category.findOne({
        where: { slug: category_slug },
      });
      if (category) where.category_id = category.id;
    }

    let order = [['createdAt', 'DESC']];
    if (sort) {
      switch (sort) {
        case 'Giá: Thấp đến Cao':
          order = [['price', 'ASC']];
          break;
        case 'Giá: Cao đến Thấp':
          order = [['price', 'DESC']];
          break;
        case 'Số km: Ít đến Nhiều':
          order = [['mileage', 'ASC']];
          break;
        case 'Bán chạy nhất':
          order = [['sold', 'DESC']];
          break;
        case 'Xem nhiều nhất':
          order = [['views', 'DESC']];
          break;
        default:
          order = [['createdAt', 'DESC']];
          break;
      }
    }

    const offset = (page - 1) * limit;
    const { rows, count } = await Product.findAndCountAll({
      where,
      include: productIncludes(),
      order,
      offset,
      limit,
    });
    return {
      products: rows.map(toPublicProduct),
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getProductBySlug = async (slug) => {
  try {
    const product = await Product.findOne({
      where: { slug, is_active: true },
      include: productIncludes(),
    });
    if (!product) return null;
    await product.increment('views', { by: 1 });
    return toPublicProduct(product);
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getSimilarProducts = async (slug, limit = 4) => {
  try {
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
  } catch (error) {
    console.log(error);
    return [];
  }
};

const createProduct = async (data) => {
  try {
    const slug = toSlug(data.name);
    const product = await Product.create({ ...data, slug });
    return toPublicProduct(product);
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  getProducts,
  getProductBySlug,
  getSimilarProducts,
  createProduct,
};
