const User = require("../models/User");
const Branch = require("../models/Branch");
const Role = require("../models/Role")
const { Op } = require("sequelize");
const bcryptjs = require("bcryptjs");

module.exports = {
  async index(req, res) {
    try {
      const users = await User.findAll({
        attributes: ["cpf", "rg", "user_name"],
        include: [
          {
            association: "Branch",
            attributes: [
              "id",
              "branch_name",
              "cep",
              "branch_email",
              "place_number",
              "company_id",
            ],
          },
          {
            association: "Role",
            attributes: ["id", "role_name"],
          },
          {
            association: "Permissions"
          }
        ],
      });

      res.send(users);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async find(req, res) {
    const { user_name, cpf, rg } = req.body;

    try {
      const users = await User.findAll({
        attributes: ["user_name", "cpf", "rg"],
        where: {
          [Op.and]: {
            user_name: { [Op.substring]: user_name ? user_name : "" },
            cpf: { [Op.substring]: cpf ? cpf : "" },
            rg: { [Op.substring]: rg ? rg : "" },
          },
        },
        include: [
          {
            association: "Branch",
            attributes: [
              "id",
              "branch_name",
              "cep",
              "branch_email",
              "place_number",
              "company_id",
            ],
          },
          {
            association: "Roles",
            attributes: ["id", "role_name"],
          },
          {
            association: "Permissions"
          }
        ],
      });

      res.send(users);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async store(req, res) {
    const { cpf, rg, user_password, user_name, branch_id, role_id, permissions } = req.body;

    try {
      const branch = await Branch.findByPk(branch_id);

      if (!branch) return res.status(404).send({ erro: "afilial não existe" });

      const role = await Role.findByPk(role_id);

      if (!role) return res.status(404).send({ erro: "cargo não existe" });

      const cryptPassword = bcryptjs.hashSync(user_password);

      const user = await User.create({
        cpf,
        rg,
        user_password: cryptPassword,
        user_name,
        branch_id,
        role_id,
      });

      const permissionsArray = permissions.split(",")

      await user.addPermissions(permissionsArray)

      res.status(201).send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async update(req, res) {
    const { id } = req.params;

    const { user_name, cpf, rg, user_password, branch_id, role_id } = req.body;

    try {
      const user = await User.findByPk(id);

      if (!user) return res.status(404).send({ erro: "usuário não existe" });

      if (user_name) user.user_name = user_name;
      if (cpf) user.cpf = cpf;
      if (rg) user.rg = rg;
      if (user_password) {
        const cryptPassword = bcryptjs.hashSync(user_password);

        user.user_password = cryptPassword;
      }
      if (branch_id) {
        const branch = await Branch.findByPk(branch_id);

        if (!branch)
          return res.status(404).send({ erro: "afilial não existe" });

        user.branch_id = branch_id;
      }

      if (role_id) {
        const role = await Role.findByPk(role_id);

        if (!role) return res.status(404).send({ erro: "cargo não existe" });

        user.role_id = role_id
        
      }

      await user.save();

      const updatedUser = await User.findByPk(user.id, {
        attributes: ["cpf", "rg", "user_password", "user_name"],
        include: {
          association: "Branch",
          include: [
            {
              association: "Branch",
              attributes: [
                "id",
                "branch_name",
                "cep",
                "branch_email",
                "place_number",
                "company_id",
              ],
            },
            {
              association: "Roles",
              attributes: ["id", "role_name"],
            },
          ],
        },
      });

      res.send(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async delete(req, res) {
    const { id } = req.params;

    try {
      const user = await User.findByPk(id);

      if (!user) return res.status(404).send({ erro: "usuario não existe" });

      await user.destroy();

      res.send({ status: "deletado", usuario: user });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
