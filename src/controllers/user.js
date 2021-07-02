const User = require("../models/User");
const Branch = require("../models/Branch");
const Role = require("../models/Role");
const Address = require("../models/Address");
const { Op } = require("sequelize");
const bcryptjs = require("bcryptjs");

module.exports = {
  async index(req, res) {
    try {
      const { company_id, branch_id, cpf } = req.params;

      let users;

      if (branch_id)
        users = await User.findAll({
          attributes: ["id", "user_name", "cpf", "rg", "created_at"],
          where: {
            branch_id,
          },
          include: [
            {
              association: "Branch",
              attributes: [
                "id",
                "branch_name",
                "branch_email",
                "place_number",
                "company_id",
              ],
              include: {
                association: "Address",
                attributes: [
                  "id",
                  "cep",
                  "street",
                  "complement",
                  "district",
                  "city",
                  "uf",
                ],
              },
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
      else if (company_id)
        users = await User.findAll({
          attributes: ["id", "user_name", "cpf", "rg", "created_at"],
          include: [
            {
              association: "Branch",
              required: true,
              attributes: [
                "id",
                "branch_name",
                "branch_email",
                "place_number",
                "company_id",
              ],
              where: {
                company_id,
              },
              include: {
                association: "Address",
                attributes: [
                  "id",
                  "cep",
                  "street",
                  "complement",
                  "district",
                  "city",
                  "uf",
                ],
              },
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
          attributes: ["id", "user_name", "cpf", "rg", "created_at"],
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
                "branch_email",
                "place_number",
                "company_id",
              ],
              include: {
                association: "Address",
                attributes: [
                  "id",
                  "cep",
                  "street",
                  "complement",
                  "district",
                  "city",
                  "uf",
                ],
              },
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
          attributes: ["id", "user_name", "cpf", "rg", "created_at"],
          include: [
            {
              association: "Branch",
              attributes: [
                "id",
                "branch_name",
                "branch_email",
                "place_number",
                "company_id",
              ],
              include: {
                association: "Address",
                attributes: [
                  "id",
                  "cep",
                  "street",
                  "complement",
                  "district",
                  "city",
                  "uf",
                ],
              },
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
        attributes: ["id", "user_name", "cpf", "rg", "created_at"],
        include: [
          {
            association: "Branch",
            attributes: [
              "id",
              "branch_name",
              "branch_email",
              "place_number",
              "company_id",
            ],
            include: {
              association: "Address",
              attributes: [
                "id",
                "cep",
                "street",
                "complement",
                "district",
                "city",
                "uf",
              ],
            },
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
        return res.status(404).send({ error: "Filial requesitada não existe" });

      const role = await Role.findByPk(role_id);

      if (!role)
        return res.status(404).send({ error: "Cargo requesitado não existe" });

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

      res.status(201).send({
        id: user.id,
        cpf: user.cpf,
        rg: user.rg,
        user_name: user.user_name,
        branch_id: user.branch_id,
        role_id: user.role_id,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;

      const { user_name, cpf, rg, user_password, role_id } = req.body;

      const user = await User.findByPk(id, {
        attributes: ["id", "cpf", "rg", "user_password", "user_name"],
        include: [
          {
            association: "Branch",
            attributes: [
              "id",
              "branch_name",
              "branch_email",
              "place_number",
              "company_id",
            ],
            include: {
              association: "Address",
              attributes: [
                "id",
                "cep",
                "street",
                "complement",
                "district",
                "city",
                "uf",
              ],
            },
          },
          {
            association: "Role",
            attributes: ["id", "role_name"],
          },
        ],
      });

      if (!user)
        return res
          .status(404)
          .send({ error: "Usuário requisitado não existe" });

      if (user_name) user.user_name = user_name;
      if (cpf) user.cpf = cpf;
      if (rg) user.rg = rg;
      if (user_password) {
        const cryptPassword = bcryptjs.hashSync(user_password);

        user.user_password = cryptPassword;
      }

      if (role_id) {
        const role = await Role.findByPk(role_id);

        if (!role)
          return res
            .status(404)
            .send({ error: "Cargo requisitaado não existe" });

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
        return res
          .status(404)
          .send({ error: "Usuário requesitado não existe" });

      await user.destroy();

      res.send();
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
