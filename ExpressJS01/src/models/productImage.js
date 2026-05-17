const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Product = require('./product');

const ProductImage = sequelize.define(
  'ProductImage',
  {
    image_url: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    is_primary: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    sort_order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: 'product_images',
    timestamps: true,
  }
);

ProductImage.belongsTo(Product, {
  foreignKey: 'product_id',
  as: 'product',
});
Product.hasMany(ProductImage, {
  foreignKey: 'product_id',
  as: 'images',
});

module.exports = ProductImage;
