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
    this.hasMany(models.Manager);
    this.hasMany(models.Employer);
    this.belongsToMany(models.Permission, { through: "users_permissions" })
  }
}

module.exports = User;