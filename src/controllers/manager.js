const Manager = require("../models/Manager");
const Branch = require("../models/Branch");
const Role = require("../models/Role");

module.exports = {
  async index(req, res) {
    try {
      const managers = await Manager.findAll({
        attributes: ["manager_name", "rg", "cpf"],
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

  async store(req, res) {
    const {
      manager_name,
      rg,
      cpf,
      manager_password,
      branch_id,
      role_id,
    } = req.body;

    try {
      const branch = await Branch.findByPk(branch_id);
      const role = await Role.findByPk(role_id);

      if (!branch || !role)
        return res.status(404).send({ erro: "afilial ou cargo não existe" });

      const manager = await Manager.create({
        manager_name,
        rg,
        cpf,
        manager_password,
        branch_id,
        role_id,
      });

      res.status(201).send({
        manager_name,
        rg,
        cpf,
        branch: branch.branch_name,
        role: role.role_name,
      });
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

  async delete(req, res) {
    const { id } = req.params;

    const manager = await Manager.findByPk(id);

    if (!manager) return res.status(404).send({ erro: "gerente não existe" });

    await manager.destroy();

    res.send(
      {
        status: "deletado",
        gerente: manager
      }
    )
  },
};
