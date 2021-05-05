import { Model, DataTypes } from 'sequelize';

class Purchase extends Model {
  static init(sequelize) {
    super.init(
      {
        payment_method_id: DataTypes.INTEGER,
        logbook_invetory_id: DataTypes.INTEGER
      }, 
      {
        sequelize,
      }
    );

    return this;
  }
}

module.exports = Purchase;
