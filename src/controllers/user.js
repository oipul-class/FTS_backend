const User = require("../models/User");
const Branch = require("../models/Branch");
const Role = require("../models/Role");
const { Op } = require("sequelize");
const bcryptjs = require("bcryptjs");

module.exports = {
  async index(req, res) {
    try {
      const { branch_id, cpf } = req.body;

      let users;

      if (branch_id)
        users = await User.findAll({
          attributes: ["id", "user_name", "cpf", "rg"],
          where: {
            branch_id,
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
              association: "Role",
              attributes: ["id", "role_name"],
            },
            {
              association: "Permissions",
              attributes: ["id", "permission_name"],
            },
          ],
        });
      else if (cpf)
        users = await User.findAll({
          attributes: ["id", "user_name", "cpf", "rg"],
          where: {
            cpf: {
              [Op.substring]: cpf,
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
              association: "Role",
              attributes: ["id", "role_name"],
            },
            {
              association: "Permissions",
              attributes: ["id", "permission_name"],
            },
          ],
        });
      else
        users = await User.findAll({
          attributes: ["id", "user_name", "cpf", "rg"],
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
              association: "Permissions",
              attributes: ["id", "permission_name"],
            },
          ],
        });

      res.send(users);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async find(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id, {
        attributes: ["id", "user_name", "cpf", "rg"],
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
            association: "Permissions",
            attributes: ["id", "permission_name"],
          },
        ],
      });

      res.send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async store(req, res) {
    try {
      const {
        cpf,
        rg,
        user_password,
        user_name,
        branch_id,
        role_id,
        permissions,
      } = req.body;

      const branch = await Branch.findByPk(branch_id);

      if (!branch)
        return res.status(404).send({ erro: "Filial requesitada não existe" });

      const role = await Role.findByPk(role_id);

      if (!role)
        return res.status(404).send({ erro: "Cargo requesitado não existe" });

      const user = await User.create({
        cpf,
        rg,
        user_password: bcryptjs.hashSync(user_password),
        user_name,
        branch_id,
        role_id,
      });

      const permissionsArray = permissions.split(",");

      await user.addPermissions(permissionsArray);

      res.status(201).send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;

      const { user_name, cpf, rg, user_password, branch_id, role_id } =
        req.body;

      const user = await User.findByPk(id, {
        attributes: ["id", "cpf", "rg", "user_password", "user_name"],
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

      if (!user)
        return res.status(404).send({ erro: "Usuário requisitado não existe" });

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
          return res
            .status(404)
            .send({ erro: "Filial requisitada não existe" });

        user.branch_id = branch_id;
      }

      if (role_id) {
        const role = await Role.findByPk(role_id);

        if (!role)
          return res
            .status(404)
            .send({ erro: "Cargo requisitaado não existe" });

        user.role_id = role_id;
      }

      await user.save();

      res.send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);

      if (!user)
        return res.status(404).send({ erro: "Usuário requesitado não existe" });

      await user.destroy();

      res.send();
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
