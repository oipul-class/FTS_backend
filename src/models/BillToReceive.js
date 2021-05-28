const { Model, DataTypes } = require("sequelize");

class BillToReceive extends Model {
  static init(sequelize) {
    super.init(
      {
        received: DataTypes.BOOLEAN,
      }, 
      {
        sequelize,
        tableName: "bills_to_receive"
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Sale);
  }
}

module.exports = BillToReceive;
