const User = require("../models/User");
const Manager = require("../models/Manager");
const Employer = require("../models/Employer");
const Branch = require("../models/Branch");
const { Op } = require("sequelize");
const bcryptjs = require("bcryptjs");

module.exports = {
  async index(req, res) {
    try {
      const users = await User.findAll({
        attributes: [
          "cpf",
          "user_password",
          "user_name",
          "user_access",
          "branch_id",
        ],
        include: [
          { model: Manager, attributes: ["rg"] },
          { model: Employer, attributes: ["rg"] },
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
        ],
      });

      res.send(users);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async find(req, res) {
    const { user_name, cpf, user_access } = req.body;

    try {
      const users = await User.findAll({
        attributes: ["user_name", "cpf", "user_access"],
        where: {
          [Op.and]: {
            user_name: { [Op.substring]: user_name ? user_name : "" },
            cpf: { [Op.substring]: cpf ? cpf : "" },
          },
        },
        include: [
          { model: Manager, attributes: ["rg"] },
          { model: Employer, attributes: ["rg"] },
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
        ],
      });

      res.send(users);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async store(req, res) {
    const {
      cpf,
      rg,
      user_password,
      user_name,
      user_access,
      branch_id,
    } = req.body;

    try {
      const branch = await Branch.findByPk(branch_id);

      if (!branch) return res.status(404).send({ erro: "afilial não existe" });

      const cryptPassword = bcryptjs.hashSync(user_password);

      const user = await User.create({
        cpf,
        user_password: cryptPassword,
        user_name,
        user_access,
        branch_id,
      });

      let role;

      if (user_access == 2 || user_access == 3 || user_access == 4) {
        const manager = await user.createManager({
          rg,
        });

        role = manager;
      } else if (user_access == 5 || user_access == 6 || user_access == 7) {
        const employer = await user.createEmployer({
          rg,
        });

        role = employer;
      }

      const response = {
        cpf,
        user_password,
        user_name,
        user_access,
        branch: branch,
        role,
      };

      res.status(201).send(response);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async update(req, res) {
    const { id } = req.params;

    const { user_name, cpf, user_password, user_access, branch_id } = req.body;

    try {
      const user = await User.findByPk(id);

      if (!user) return res.status(404).send({ erro: "usuário não existe" });

      if (user_name) user.user_name = user_name;
      if (cpf) user.cpf = cpf;
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
      if (user_access) {
        if (user_access == 2 || user_access == 3 || user_access == 4) {
          const employer = await Employer.findByPk(id, {attributes: ["rg"]});
          if (employer) {

            const manager = await user.createManager({
              rg: employer.rg,
            });

            await employer.destroy();

          } else {
            user.user_access = user_access;
          }
        } else if (user_access == 5 || user_access == 6 || user_access == 7) {
          const manager = await Manager.findByPk(id, {attributes: ["rg"]});

          if (manager) {
            manager.destroy();

            const employer = await user.createEmployer({
              rg: manager.rg,
            });
          } else {
            user.user_access = user_access;
          }
        }
      }

      await user.save();

      const updatedUser = await User.findByPk(user.id, {
        attributes: [
          "cpf",
          "user_password",
          "user_name",
          "user_access",
          "branch_id",
        ],
        include: [
          { model: Manager, attributes: ["rg"] },
          { model: Employer, attributes: ["rg"] },
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
        ],
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
