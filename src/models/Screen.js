const { Model, DataTypes } = require("sequelize");

class Screen extends Model {
  static init(sequelize) {
    super.init(
      {
        screen_name: DataTypes.STRING,
        route: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Permission, { through: "screens_permissions" });
  }
}
module.exports = Screen;
