const { Model, DataTypes } = require("sequelize");

class Branch extends Model {
  static init(sequelize) {
    super.init(
      {
        branch_name: DataTypes.STRING,
        branch_email: DataTypes.STRING,
        place_number: DataTypes.INTEGER,
        company_id: DataTypes.INTEGER,
        address_id: DataTypes.INTEGER,
        phone_id: DataTypes.INTEGER,
      },
      {
        sequelize,
        paranoid: true,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Company);
    this.hasMany(models.User);
    this.hasMany(models.LogBookInventory);
    this.hasMany(models.Purchase);
    this.hasMany(models.Sale);
    this.belongsTo(models.Address);
    this.belongsTo(models.Phone);
  }
}

module.exports = Branch;
