const UnitOfMeasurement = require("../models/UnitOfMeasurement");

module.exports = {
  async index(req, res) {
    try {
      const units = await UnitOfMeasurement.findAll();

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
