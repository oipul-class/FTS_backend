const { DataTypes, Model } = require("sequelize");

class Purchase extends Model {
  static init(sequelize) {
    super.init(
      {
        payment_method_id: DataTypes.INTEGER,
      }, 
      {
        sequelize,
        paranoid: true,
      }
    );

    return this;
  }
  
  static associate(models) {
    this.belongsTo(models.PaymentMethod);
    this.hasMany(models.ItemPurchase);
  }
}

module.exports = Purchase;
