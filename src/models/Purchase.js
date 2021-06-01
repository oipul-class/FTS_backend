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
        hooks: {
          afterCreate: async (purchase, options) => {
            await purchase.createBillToPay({ paid: false });
          },
        }
      }
    );

    return this;
  }
  
  static associate(models) {
    this.belongsTo(models.PaymentMethod);
    this.hasOne(models.BillToPay);
    this.hasMany(models.ItemPurchase);
    this.belongsTo(models.Branch);
  }
}

module.exports = Purchase;
