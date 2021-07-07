const { DataTypes, Model } = require("sequelize");

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        product_name: DataTypes.STRING(45),
        description: DataTypes.TEXT,
        bar_code: DataTypes.STRING,
        cost_per_item: DataTypes.DECIMAL(15, 2),
        image_url: DataTypes.STRING,
        unit_of_measurement_id: DataTypes.INTEGER,
        product_type_id: DataTypes.INTEGER,
        company_id: DataTypes.INTEGER,
      },
      {
        sequelize,
        paranoid: true,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Company);
    this.belongsTo(models.ProductType);
    this.belongsTo(models.UnitOfMeasurement);
    this.hasOne(models.LogBookInventory);
    this.hasMany(models.ItemPurchase);
  }
}

module.exports = Product;
