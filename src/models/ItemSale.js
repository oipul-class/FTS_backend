const { DataTypes, Model } = require("sequelize");
const Sale = require("./Sale");
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

              let sale_total_value = 0;

              logbook.quantity_acquired =
                logbook.quantity_acquired - itemSale.quantity;

              await logbook.save();

              const sale = await itemSale.getSale();

              sale.total_value =
                parseFloat(sale.total_value) +
                itemSale.cost_per_item * itemSale.quantity;

              sale_total_value = sale.total_value;

              if (sale.discount || sale.discount > 0)
                sale.total_value =
                  sale_total_value - (sale_total_value * sale.discount) / 100;

              await sale.save();
            } catch (error) {
              console.error(error);
            }
          },
          beforeDestroy: async (itemSale, options) => {
            try {
              const logbook = await itemSale.getLogBookInventory();

              let sale_total_value = 0;

              logbook.quantity_acquired =
                logbook.quantity_acquired + itemSale.quantity;

              await logbook.save();
              const sale = await Sale.findByPk(itemSale.sale_id);
              sale.total_value =
                parseFloat(sale.total_value) -
                itemSale.cost_per_item * itemSale.quantity;

              sale_total_value = sale.total_value;

              if (sale.discount || sale.discount > 0)
                sale.total_value =
                  sale_total_value - (sale_total_value * sale.discount) / 100;

              await sale.save();
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
