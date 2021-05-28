const { Model, DataTypes } = require("sequelize");

class BillToPay extends Model {
  static init(sequelize) {
    super.init(
      {
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
