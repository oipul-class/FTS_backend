const { Model, DataTypes } = require("sequelize");

class Manager extends Model {
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
    this.belongsTo(models.User, { foreignKey: "id" });
  }
}

module.exports = Manager;
