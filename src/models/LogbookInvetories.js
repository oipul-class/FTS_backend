import { DataTypes, Model } from "sequelize";

class LogbookInvetories extends Model {
  static init(sequelize) {
    super.init(
      {
        data_of_acquisition: DataTypes.DATE,
        cost_per_item: DataTypes.DECIMAL(6, 2),
        quantity_acquired: DataTypes.INTEGER,
        total_value: DataTypes.DECIMAL(6, 2),
        branch_id: DataTypes.INTEGER,
        lot_id: DataTypes.INTEGER,
        product_id: DataTypes.INTEGER,
        costumer_id: DataTypes.INTEGER
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

module.exports = LogbookInvetories;
