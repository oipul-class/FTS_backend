const Manager = require("../models/Manager");
const { Op } = require("sequelize");

module.exports = {
  async index(req, res) {
    try {
      const managers = await Manager.findAll({
        attributes: ["id", "rg"],
        include: {
          association: "User",
          attributes: [
            "cpf",
            "user_password",
            "user_name",
            "user_access",
            "branch_id",
          ],
        },
      });

      res.send(managers);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async find(req, res) {
    const { manager_name, rg, cpf } = req.body;

    try {
      const managers = await Manager.findAll({
        where: {
          [Op.and]: [
            {
              manager_name: {
                [Op.substring]: manager_name ? manager_name : "",
              },
            },
            {
              rg: {
                [Op.substring]: rg ? rg : "",
              },
            },
            {
              cpf: {
                [Op.substring]: cpf ? cpf : "",
              },
            },
          ],
        },
        include: [
          {
            association: "Branch",
            attributes: ["branch_name", "cep", "branch_email", "place_number"],
          },
          {
            association: "Role",
            attributes: ["role_name"],
          },
        ],
      });

      res.send(managers);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async update(req, res) {
    const { id } = req.params;

    const {
      manager_name,
      rg,
      cpf,
      manager_password,
      branch_id,
      role_id,
    } = req.body;

    try {
      const manager = await Manager.findByPk(id);

      if (!manager) return res.status(404).send({ erro: "gerente não existe" });

      if (manager_name) manager.manager_name = manager_name;
      if (rg) manager.rg = rg;
      if (cpf) manager.cpf = cpf;
      if (manager_password) manager.manager_password = manager_password;
      if (branch_id) {
        const branch = await Branch.findByPk(branch_id);

        if (!branch)
          return res.status(404).send({ erro: "afilial não existe" });

        manager.branch_id = branch_id;
      }
      if (role_id) {
        const role = await Branch.findByPk(role_id);

        if (!role) return res.status(404).send({ erro: "cargo não existe" });

        manager.role_id = role_id;
      }

      await manager.save();

      res.send(manager);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
