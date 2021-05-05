const { DataTypes, Model } = require("sequelize");

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

module.exports = Costumers;
