const Manager = require("../models/Manager");
const User = require("../models/User");

const { Op } = require("sequelize");

module.exports = {
  async index(req, res) {
    try {
      const managers = await Manager.findAll({
        attributes: ["id", "rg"],
        include: {
          model: User,
          attributes: ["cpf", "user_name"],
        },
      });

      res.send(managers);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async find(req, res) {
    const { rg } = req.body;

    try {
      const managers = await Manager.findAll({
        where: {
          rg: { [Op.substring]: rg ? rg : "" },
        },
      });

      res.send(managers);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async update(req, res) {
    const { id } = req.params;

    const { rg } = req.body;

    try {
      const manager = await Manager.findByPk(id);

      if (!manager) return res.status(404).send({ erro: "gerente não existe" });

      if (manager_name) manager.manager_name = manager_name;
      if (rg) manager.rg = rg;

      await manager.save();

      res.send(manager);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
