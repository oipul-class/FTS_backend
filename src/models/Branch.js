const { Model, DataTypes } = require("sequelize");

class Branch extends Model {
  static init(sequelize) {
    super.init(
      {
        branch_name: DataTypes.STRING,
        cep: DataTypes.INTEGER,
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
    this.hasOne(models.Manager);
  }
}

module.exports = Branch;