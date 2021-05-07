const { DataTypes, Model } = require("sequelize");

class Costumer extends Model {
  static init(sequelize) {
    super.init(
      {
        Costumer_name: DataTypes.STRING(45),
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

module.exports = Costumer;
