import { DataTypes, Model } from 'sequelize';

class Costumers extends Model {
  static init(sequelize) {
    super.init(
      {
        costumers_name: DataTypes.STRING(45),
        cpf: DataTypes.STRING(14)
      }, 
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Costumers;
