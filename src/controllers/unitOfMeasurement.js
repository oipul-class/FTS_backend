const UnitOfMeasurement = require("../models/UnitOfMeasurement");
const { Op } = require("sequelize");

module.exports = {
  async index(req, res) {
    try {
      const { unit_name } = req.body;

      let units;

      if (unit_name)
        units = await UnitOfMeasurement.findAll({
          where: {
            unit_name: { [Op.substring]: unit_name },
          },
        });
      else units = await UnitOfMeasurement.findAll();

      res.send(units);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async find(req, res) {
    try {
      const { id } = req.params;

      const unit = await UnitOfMeasurement.findByPk(id);

      res.send(unit);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
