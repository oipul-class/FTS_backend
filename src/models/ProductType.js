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

  static associate(models) {
    this.hasMany(models.Product);
  }
}

module.exports = ProductType;
