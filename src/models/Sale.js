const { DataTypes, Model } = require("sequelize");

class Sale extends Model {
  static init(sequelize) {
    super.init(
      {
        payment_method_id: DataTypes.INTEGER,
        costumer_id: DataTypes.INTEGER,
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
    this.belongsTo(models.Costumer);
    this.hasMany(models.ItemSale, { foreignKey: "sale_id"});
  }
}

module.exports = Sale;
