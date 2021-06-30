const { Model, DataTypes } = require("sequelize");

class Phone extends Model {
  static init(sequelize) {
    super.init(
      {
        phone: DataTypes.STRING(11),
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.hasOne(models.Branch);
  }
}

module.exports = Phone;
