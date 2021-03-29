const { Model, DataTypes } = require("sequelize/types");

class Company extends Model {
  static init(sequelize) {
    super.init(
      {
        cnpj: DataTypes.INTEGER,
        fantasy_name: DataTypes.STRING,
        social_reason: DataTypes.STRING,
        place_numbe: DataTypes.INTEGER,
        cep: DataTypes.INTEGER,
        state: DataTypes.STRING,
        nature_of_the_business: DataTypes.STRING,
        commercial_email: DataTypes.STRING,
        plan_id: DataTypes.INTEGER,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Branch);
    this.hasOne(models.Plan)
  }
}
module.exports = Company;
