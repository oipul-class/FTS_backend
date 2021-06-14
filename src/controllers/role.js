const { Op } = require("sequelize");
const Role = require("../models/Role");

module.exports = {
  async index(req, res) {
    try {
      const { role_name } = req.body;

      let roles;

      if (role_name)
        roles = await Role.findAll({
          attributes: ["id", "role_name"],
          where: {
            role_name: { [Op.substring]: role_name },
          },
        });
      else
        roles = await Role.findAll({
          attributes: ["id", "role_name"],
        });

      res.send(roles);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async find(req, res) {
    try {
      const { id } = req.params;

      const role = await Role.findByPk(id, {
        attributes: ["id", "role_name"],
      });
      res.send(role);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async store(req, res) {
    try {
      const { role_name } = req.body;

      const role = await Role.create({ role_name });

      res.status(201).send(role);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
