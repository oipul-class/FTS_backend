const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        cpf: DataTypes.STRING,
        user_password: DataTypes.STRING,
        user_name: DataTypes.STRING,
        user_access: DataTypes.INTEGER,
        branch_id: DataTypes.INTEGER,

      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Branch);
    this.hasMany(models.Manager, { foreignKey: "id" });
    this.hasMany(models.Employer, { foreignKey: "id" });
    this.belongsToMany(models.Permission, { through: "users_permissions" })
  }
}

module.exports = User;