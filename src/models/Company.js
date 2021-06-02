const { Model, DataTypes } = require("sequelize");

class Company extends Model {
  static init(sequelize) {
    super.init(
      {
        cnpj: DataTypes.STRING(18),
        fantasy_name: DataTypes.STRING,
        social_reason: DataTypes.STRING,
        place_number: DataTypes.INTEGER,
        companie_password: DataTypes.STRING,
        cep: DataTypes.STRING(10),
        state: DataTypes.STRING,
        nature_of_the_business: DataTypes.STRING,
        commercial_email: DataTypes.STRING,
        plan_id: DataTypes.INTEGER,
      },
      {
        sequelize,
        paranoid: true,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Plan)
    this.hasMany(models.Branch);
    this.belongsToMany(models.Permission, { through: "companies_permissions" });
    this.hasMany(models.Product);
  }
}
module.exports = Company;
