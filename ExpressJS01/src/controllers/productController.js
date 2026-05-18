const { ok, created, fail, noContent } = require('../utils/apiResponse');
const productService = require('../services/productService');

const PRODUCT_STATUSES = ['normal', 'new', 'promotion', 'best_seller', 'featured'];

const parseProductsQuery = (query) => {
  const page = Math.max(1, parseInt(query.page, 10) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(query.limit, 10) || 8));

  if (query.status && !PRODUCT_STATUSES.includes(query.status)) {
    const err = new Error('status không hợp lệ');
    err.status = 400;
    err.code = 'VALIDATION_ERROR';
    throw err;
  }

  const sortAllowed = ['created_at', 'price', 'mileage'];
  if (query.sort && !sortAllowed.includes(query.sort)) {
    const err = new Error('sort không hợp lệ');
    err.status = 400;
    err.code = 'VALIDATION_ERROR';
    throw err;
  }

  if (query.order && !['asc', 'desc'].includes(query.order)) {
    const err = new Error('order không hợp lệ');
    err.status = 400;
    err.code = 'VALIDATION_ERROR';
    throw err;
  }

  return {
    status: query.status,
    category_slug: query.category_slug,
    page,
    limit,
    search: query.search,
    price_min: query.price_min ? parseInt(query.price_min, 10) : undefined,
    price_max: query.price_max ? parseInt(query.price_max, 10) : undefined,
    brand: query.brand,
    year_min: query.year_min ? parseInt(query.year_min, 10) : undefined,
    year_max: query.year_max ? parseInt(query.year_max, 10) : undefined,
    fuel_type: query.fuel_type,
    transmission: query.transmission,
    mileage_max: query.mileage_max ? parseInt(query.mileage_max, 10) : undefined,
    location: query.location,
    sort: query.sort || 'created_at',
    order: query.order || 'desc',
  };
};

const getProducts = async (req, res) => {
  const params = parseProductsQuery(req.query);
  const result = await productService.getProducts(params);
  if (!result) {
    return fail(res, 500, 'INTERNAL_ERROR', 'Lỗi server');
  }
  return ok(res, result.items, result.meta);
};

const getProductDetail = async (req, res) => {
  const { slug } = req.params;
  const product = await productService.getProductBySlug(slug);
  if (!product) {
    return fail(res, 404, 'NOT_FOUND', 'Sản phẩm không tồn tại');
  }
  return ok(res, product);
};

const getSimilarProducts = async (req, res) => {
  const { slug } = req.params;
  const products = await productService.getSimilarProducts(slug);
  return ok(res, products);
};

const createProduct = async (req, res) => {
  const product = await productService.createProduct(req.body);
  if (!product) {
    return fail(res, 400, 'VALIDATION_ERROR', 'Tạo sản phẩm thất bại');
  }
  return created(res, product, `/v1/api/products/${product.slug}`);
};

const updateProduct = async (req, res) => {
  const { slug } = req.params;
  const product = await productService.updateProductBySlug(slug, req.body);
  if (!product) {
    return fail(res, 404, 'NOT_FOUND', 'Sản phẩm không tồn tại');
  }
  return ok(res, product);
};

const deleteProduct = async (req, res) => {
  const { slug } = req.params;
  const deleted = await productService.deleteProductBySlug(slug);
  if (!deleted) {
    return fail(res, 404, 'NOT_FOUND', 'Sản phẩm không tồn tại');
  }
  return noContent(res);
};

module.exports = {
  getProducts,
  getProductDetail,
  getSimilarProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
