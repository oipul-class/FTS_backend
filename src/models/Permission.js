const { Model, DataTypes } = require("sequelize");

class Permission extends Model {
  static init(sequelize) {
    super.init(
      {
        permission_name: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.User, { through: "users_permissions" });
    this.belongsToMany(models.Company, { through: "companies_permissions" });
    this.belongsToMany(models.Screen, { through: "screens_permissions" });
  }
}

module.exports = Permission;
