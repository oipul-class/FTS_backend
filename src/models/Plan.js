const { DataTypes, Model } = require("sequelize");

class Plan extends Model {
  static init(sequelize) {
    super.init(
      {
        plan_name: DataTypes.STRING,
        branch_limit: DataTypes.INTEGER,
        user_limit_per_branch: DataTypes.INTEGER,
        use_phone_for_sale: DataTypes.BOOLEAN,
        access_website: DataTypes.BOOLEAN,
        value: DataTypes.DECIMAL(15, 2),
        description: DataTypes.TEXT,
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
