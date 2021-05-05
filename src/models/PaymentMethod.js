import { Model, DataTypes } from 'sequelize';

class PaymentMethod extends Model {
  static init(sequelize) {
    super.init(
      {
        method: DataTypes.STRING(45),
      }, 
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Purchase);
  }
}

export default PaymentMethod;
