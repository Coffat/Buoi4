const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Category = sequelize.define(
  'Category',
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING(120),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: 'categories',
    timestamps: true,
  }
);

module.exports = Category;
