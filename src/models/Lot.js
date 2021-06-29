const { DataTypes, Model } = require("sequelize");

class Lot extends Model {
  static init(sequelize) {
    super.init(
      {
        lot_number: DataTypes.STRING(45),
        manufacture_date: DataTypes.DATEONLY,
        expiration_date: DataTypes.DATEONLY,
      },
      {
        sequelize,
      }
    );
      
  }
  
  static associate(models) {
    this.hasMany(models.LogBookInventory, {
      as: "logbook_inventories"
    });
  }
}

module.exports = Lot;
