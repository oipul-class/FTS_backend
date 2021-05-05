const { DataTypes, Model } = require("sequelize");

class Costumers extends Model {
  static init(sequelize) {
    super.init(
      {
        costumers_name: DataTypes.STRING(45),
        cpf: DataTypes.STRING(14),
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.LogBookInventory);
    this.hasMany(models.Sale);
  }
}

module.exports = Costumers;
