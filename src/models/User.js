const { Model, DataTypes } = require("sequelize/types");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        user_name: DataTypes.STRING,
        rg: DataTypes.STRING,
        cpf: DataTypes.STRING,
        user_password: DataTypes.STRING,
        branch_id: DataTypes.INTEGER,
        role_id: DataTypes.INTEGER
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Manager);
  }
}
