const { Model, DataTypes } = require("sequelize");

class Role extends Model {
  static init(sequelize) {
    super.init(
      {
        role_name: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Manager)
  }
}

module.exports = Role;