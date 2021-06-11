const { DataTypes, Model } = require("sequelize");

class Costumer extends Model {
  static init(sequelize) {
    super.init(
      {
        costumer_name: DataTypes.STRING(45),
        cpf: DataTypes.STRING(11),
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Sale);
  }
}

module.exports = Costumer;
