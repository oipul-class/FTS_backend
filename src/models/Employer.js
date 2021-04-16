const { Model, DataTypes } = require("sequelize");

class Employer extends Model {
  static init(sequelize) {
    super.init(
      {
        rg: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User);
  }
}

module.exports = Employer;
