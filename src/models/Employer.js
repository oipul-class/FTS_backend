const { Model, DataTypes } = require("sequelize");

class Employer extends Model {
  static init(sequelize) {
    super.init(
      {
        id: DataTypes.INTEGER,
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
