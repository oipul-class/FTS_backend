const { Model, DataTypes } = require("sequelize");

class BillToPay extends Model {
  static init(sequelize) {
    super.init(
      {
        paid: DataTypes.BOOLEAN,
      }, 
      {
        sequelize,
        tableName: "bills_to_pay"
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Purchase);
  }
}

module.exports = BillToPay;
