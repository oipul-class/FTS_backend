const { Model, DataTypes } = require("sequelize");

class Website extends Model {
  static init(sequelize) {
    super.init(
      {
        logo_img: DataTypes.STRING,
        banner_img: DataTypes.STRING,
        slogan: DataTypes.STRING,
        primary_color: DataTypes.STRING,
        secondary_color: DataTypes.STRING,
        light_color: DataTypes.STRING,
        dark_color: DataTypes.STRING,
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
