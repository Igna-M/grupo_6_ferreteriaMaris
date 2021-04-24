'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Category, { 
        as: "category",
        foreignKey: "category"
    })
    }
  };
  Product.init({
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    model: DataTypes.STRING,
    description: DataTypes.STRING,
    category: DataTypes.INTEGER,
    features: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    amount: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};