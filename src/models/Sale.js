const { DataTypes, Model } = require("sequelize");

class Sale extends Model {
  static init(sequelize) {
    super.init(
      {
        payment_method_id: DataTypes.INTEGER,
        logbook_invetory_id: DataTypes.INTEGER,
        costumer_id: DataTypes.INTEGER,
      }, 
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.PaymentMethod);
    this.belongsTo(models.LogBookInventory);
    this.belongsTo(models.Costumer);
  }
}

module.exports = Sale;
