const Employer = require("../models/Employer");

module.exports = {
  async index(req, res) {
    try {
      const response = await Employer.findAll({
        attributes: ["id", "rg"],
      });

      res.send(response);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async find(req, res) {
    const employerId = req.params.id;

    try {
      const response = await Employer.findByPk(employerId, {
        attributes: ["id", "rg"],
      });

      res.send(response);
    } catch (error) {
      res.status(500).send(error);
    }
  },
};
