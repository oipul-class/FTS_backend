const { Model, DataTypes } = require("sequelize");

class Branch extends Model {
  static init(sequelize) {
    super.init(
      {
        branch_name: DataTypes.STRING,
        cep: DataTypes.STRING,
        branch_email: DataTypes.STRING,
        place_number: DataTypes.INTEGER,
        company_id: DataTypes.INTEGER,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Company);
    this.hasMany(models.User);
    this.hasMany(models.LogBookInventory);
  }
}

module.exports = Branch;