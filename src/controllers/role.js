const { Op } = require("sequelize");
const Role = require("../models/Role");

module.exports = {
  async index(req, res) {
    try {
      const roles = await Role.findAll({
        attributes: ["role_name"],
      });

      res.send(roles);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  async find(req, res) {
    const { role_name } = req.body;
    console.log(role_name);
    try {
      const roles = await Role.findAll({
        attributes: ["role_name"],
        where: {
          role_name: { [Op.substring]: role_name },
        },
      });

      res.send(roles);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  async store(req, res) {
    const { role_name } = req.body;

    try {
      await Role.create({ role_name });

      res.status(201).send({ mensagem: `o cargo ${role_name} foi criado` });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  async update(req, res) {
    const { id } = req.params;

    const { role_name } = req.body;

    try {
      const role = await Role.findByPk(id);

      if (!role) return res.status(404).send({ erro: "cargo não encontrado" });

      const velho_nome_do_cargo = role.role_name;

      role.role_name = role_name;

      await role.save();

      res.send({
        mensagem: `agora ${velho_nome_do_cargo} é ${role.role_name}`,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  async delete(req, res) {
    const { id } = req.params;

    try {
      const role = await Role.findByPk(id);

      if (!role) return res.status(404).send({ erro: "cargo não existe" });

      await role.destroy();

      res.send({ status: "deletado", cargo: role.role_name });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
