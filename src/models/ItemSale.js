const { DataTypes, Model } = require("sequelize");

class ItemSale extends Model {
  static init(sequelize) {
    super.init(
      {
        cost_per_item: DataTypes.DECIMAL(6, 2),
        quantity: DataTypes.INTEGER,
        total_value: DataTypes.DECIMAL(6, 2),
        discount: DataTypes.INTEGER,
        logbook_invetory_id: DataTypes.INTEGER,
      },
      {
        sequelize,
        paranoid: true,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.LogBookInventory);
    this.belongsTo(models.Sale);
  }
}

module.exports = ItemSale;
