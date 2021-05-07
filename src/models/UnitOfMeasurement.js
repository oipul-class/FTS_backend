const { DataTypes, Model } = require("sequelize");

class UnitOfMeasurement extends Model {
  static init(sequelize) {
    super.init(
      {
        unit_name: DataTypes.STRING(10),
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Product);
  }
}

module.exports = UnitOfMeasurement;
