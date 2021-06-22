const { Model, DataTypes } = require("sequelize");

class Address extends Model {
  static init(sequelize) {
    super.init(
      {
        cep: DataTypes.STRING(8),
        street: DataTypes.STRING,
        complement: DataTypes.STRING,
        district: DataTypes.STRING,
        city: DataTypes.STRING,
        uf: DataTypes.STRING(2),
      },
      {
        sequelize,
        tableName: "addresses",
      }
    );
  }

  static associate(models) {
    this.hasOne(models.Company);
    this.hasOne(models.Branch);
  }
}

module.exports = Address;
