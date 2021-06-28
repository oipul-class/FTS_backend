const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        cpf: DataTypes.STRING(11),
        rg: DataTypes.STRING(10),
        user_password: DataTypes.STRING,
        user_name: DataTypes.STRING,
        branch_id: DataTypes.INTEGER,
        role_id: DataTypes.INTEGER,
      },
      {
        sequelize,
        hooks: {
          beforeDestroy: async (user) => {
            await user.removePermissions();
          },
        },
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Branch);
    this.belongsTo(models.Role);
    this.belongsToMany(models.Permission, { through: "users_permissions" });
  }
}

module.exports = User;
