const { DataTypes, Model } = require("sequelize");

class ItemSale extends Model {
  static init(sequelize) {
    super.init(
      {
        cost_per_item: DataTypes.DECIMAL(15, 2),
        quantity: DataTypes.INTEGER,
        logbook_inventory_id: DataTypes.INTEGER,
        product_id: DataTypes.INTEGER,
      },
      {
        sequelize,
        paranoid: true,
        hooks: {
          afterCreate: async (itemSale, options) => {
            try {
              const logbook = await itemSale.getLogBookInventory();

              logbook.quantity_acquired =
                logbook.quantity_acquired - itemSale.quantity;

              await logbook.save();
            } catch (error) {
              console.error(error);
            }
          },
          afterDestroy: async (itemSale, options) => {
            try {
              const logbook = await itemSale.getLogBookInventory();

              logbook.quantity_acquired =
                logbook.quantity_acquired + itemSale.quantity;

              await logbook.save();
            } catch (error) {
              console.error(error);
            }
          },
        },
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
