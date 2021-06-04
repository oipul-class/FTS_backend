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
            [Op.substring]: {
              role_name,
            },
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
      console.log(error);
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

  async update(req, res) {
    try {
      const { id } = req.params;

      const { role_name } = req.body;

      const role = await Role.findByPk(id);

      if (!role)
        return res.status(404).send({ erro: "Cargo requisitado não existe" });

      if (role_name) role.role_name = role_name;

      await role.save();

      res.send(role);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;

      const role = await Role.findByPk(id);

      if (!role) return res.status(404).send({ erro: "Cargo requisitado não existe" });

      await role.destroy();

      res.send();
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
