const { DataTypes, Model } = require("sequelize");

class ItemPurchase extends Model {
  static init(sequelize) {
    super.init(
      {
        cost_per_item: DataTypes.DECIMAL(6, 2),
        quantity: DataTypes.INTEGER,
        total_value: DataTypes.DECIMAL(6, 2),
        product_id: DataTypes.INTEGER,
        logbook_inventory_id: DataTypes.INTEGER,
        purchase_id: DataTypes.INTEGER,
      },
      {
        sequelize,
        tableName: "item_purchase",
        paranoid: true,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Product);
    this.belongsTo(models.LogBookInventory, {
      foreignKey: "logbook_inventory_id",
    });
    this.belongsTo(models.Purchase);
  }
}

module.exports = ItemPurchase;
