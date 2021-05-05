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

    return this;
  }
}

export default Product;
