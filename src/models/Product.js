import { DataTypes, Model } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        product_name: DataTypes.STRING(45),
        total_quantity: DataTypes.INTEGER,
        unit_of_measurement_id: DataTypes.INTEGER,
        product_type_id: DataTypes.INTEGER,
        company_id: DataTypes.INTEGER,
      }, 
      {
        sequelize,
      }
      
    );
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
