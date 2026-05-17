const productService = require('../services/productService');

const getProducts = async (req, res) => {
  const {
    status,
    category_slug,
    page,
    limit,
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
  } = req.query;

  const data = await productService.getProducts({
    status,
    category_slug,
    page: parseInt(page) || 1,
    limit: parseInt(limit) || 8,
    search,
    priceMin: priceMin ? parseInt(priceMin) : undefined,
    priceMax: priceMax ? parseInt(priceMax) : undefined,
    brand,
    yearMin: yearMin ? parseInt(yearMin) : undefined,
    yearMax: yearMax ? parseInt(yearMax) : undefined,
    fuel_type,
    transmission,
    mileageMax: mileageMax ? parseInt(mileageMax) : undefined,
    location,
    sort,
  });
  if (!data) {
    return res.status(500).json({ message: 'Lỗi server' });
  }
  return res.status(200).json(data);
};

const getProductDetail = async (req, res) => {
  const { slug } = req.params;
  const product = await productService.getProductBySlug(slug);
  if (!product) {
    return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
  }
  return res.status(200).json(product);
};

const getSimilarProducts = async (req, res) => {
  const { slug } = req.params;
  const products = await productService.getSimilarProducts(slug);
  return res.status(200).json(products);
};

const createProduct = async (req, res) => {
  const product = await productService.createProduct(req.body);
  if (!product) {
    return res.status(400).json({ message: 'Tạo sản phẩm thất bại' });
  }
  return res.status(201).json(product);
};

module.exports = {
  getProducts,
  getProductDetail,
  getSimilarProducts,
  createProduct,
};
