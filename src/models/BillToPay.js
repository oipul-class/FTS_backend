const { Model, DataTypes } = require("sequelize");

class BillToPay extends Model {
  static init(sequelize) {
    super.init(
      {
        bills_date: DataTypes.DATE,
        paid: DataTypes.BOOLEAN,
      }, 
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Purchase);
  }
}

module.exports = BillToPay;
