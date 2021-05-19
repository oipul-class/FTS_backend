const { DataTypes, Model } = require("sequelize");

class UnitOfMeasurement extends Model {
  static init(sequelize) {
    super.init(
      {
        unit_name: DataTypes.STRING(10),
      },
      {
        sequelize,
        tableName: "units_of_measurement"
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Product);
  }
}

module.exports = UnitOfMeasurement;
