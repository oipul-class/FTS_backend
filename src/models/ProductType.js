import { DataTypes, Model } from 'sequelize';

class ProductType extends Model {
  static init(sequelize) {
    super.init(
      {
        type: DataTypes.STRING(20)
      }, 
      {
        sequelize,
      }
    );

    return this;
  }
}

export default ProductType;
