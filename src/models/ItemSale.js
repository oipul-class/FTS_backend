const { DataTypes, Model } = require("sequelize");

class ItemSale extends Model {
  static init(sequelize) {
    super.init(
      {
        cost_per_item: DataTypes.DECIMAL(6, 2),
        quantity: DataTypes.INTEGER,
        total_value: DataTypes.DECIMAL(6, 2),
        discount: DataTypes.INTEGER,
        logbook_inventory_id: DataTypes.INTEGER,
        product_id: DataTypes.INTEGER,
        sale_id: DataTypes.INTEGER,
      },
      {
        sequelize,
        paranoid: true,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.LogBookInventory, {
      foreignKey: "logbook_inventory_id",
    });
    this.belongsTo(models.Sale);
  }
}

module.exports = ItemSale;
