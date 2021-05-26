const { Model, DataTypes } = require("sequelize");

class BillToReceive extends Model {
  static init(sequelize) {
    super.init(
      {
        bills_date: DataTypes.DATE,
        received: DataTypes.BOOLEAN,
      }, 
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Sales);
  }
}

module.exports = BillToReceive;
