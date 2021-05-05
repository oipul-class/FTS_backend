import { DataTypes, Model } from 'sequelize';

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

    return this;
  }
}

export default Lot;
