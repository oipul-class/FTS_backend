const { DataTypes, Model } = require("sequelize");

class ProductType extends Model {
  static init(sequelize) {
    super.init(
      {
        type: DataTypes.STRING(20)
      }, 
      {
        sequelize,
      }
    );

  }
}

module.exports = ProductType;
