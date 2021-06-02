const { DataTypes, Model } = require("sequelize");

class Plan extends Model {
  static init(sequelize) {
    super.init(
      {
        plan_name: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Company);
  }
}

module.exports = Plan;
