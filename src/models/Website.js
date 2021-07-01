const { Model, DataTypes } = require("sequelize");

class Website extends Model {
  static init(sequelize) {
    super.init(
      {
        website_logo: DataTypes.STRING,
        website_banner: DataTypes.STRING,
        website_slogan: DataTypes.STRING,
        website_customization: DataTypes.TEXT,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasOne(models.Company);
  }
}

module.exports = Website;
