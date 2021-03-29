const { Model, DataTypes } = require("sequelize/types");

class Manager extends Model {
  static init(sequelize) {
    super.init(
      {
        manager_name: DataTypes.STRING,
        rg: DataTypes.STRING,
        cpf: DataTypes.STRING,
        manager_password: DataTypes.STRING,
        branch_id: DataTypes.INTEGER,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Branch);
    this.hasMany(Models.User);
    this.hasOne(models.Role);
  }
}

module.exports = Manager;
