const { DataTypes, Model } = require("sequelize");

class ItemPurchase extends Model {
  static init(sequelize) {
    super.init(
      {
        cost_per_item: DataTypes.DECIMAL(6, 2),
        quantity: DataTypes.INTEGER,
        total_value: DataTypes.DECIMAL(6, 2),
        logbook_invetory_id: DataTypes.INTEGER
      }, 
      {
        sequelize,
        paranoid: true,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Product);
    this.belongsTo(models.LogBookInventory);
    this.belongsTo(models.Purchase);
  }
}

module.exports = ItemPurchase;
