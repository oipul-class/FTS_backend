const { Model, DataTypes } = require("sequelize/types");

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
    this.belongsToMany(models.Manager);
  }
}

module.exports = Role;