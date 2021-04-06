const User = require("../models/User");
const Manager = require("../models/Manager");

module.exports = {
  async index(req, res) {
    try {
      const users = await User.findAll({
        attributes: ["user_name", "rg", "cpf"],
        include: {
          association: "Manager",
          attributes: ["manager_name", "rg", "cpf"],
          include: [
            {
              association: "Branch",
              attributes: [
                "branch_name",
                "cep",
                "branch_email",
                "place_number",
              ],
            },
            {
              association: "Role",
              attributes: ["role_name"],
            },
          ],
        },
      });

      res.send(users);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async store(req, res) {
    const { user_name, rg, cpf, user_password, manager_id } = req.body;

    try {
      const manager = await Manager.findByPk(manager_id);

      if (!manager) return res.status(404).send({ erro: "gerente não existe" });

      const user = await User.create({
        user_name,
        rg,
        cpf,
        user_password,
        manager_id,
      });

      res.status(201).send({ user_name, rg, cpf, user_password, manager_id });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async update(req, res) {
    const { id } = req.params;

    const { user_name, rg, cpf, user_password, manager_id } = req.body;

    try {
      const user = await User.findByPk(id);

      if (!user) return res.status(404).send({ erro: "usuário não existe" });

      if (user_name) user.user_name = user_name;
      if (rg) user.rg = rg;
      if (cpf) user.cpf = cpf;
      if (user_password) user.user_password = user_password;
      if (manager_id) {
        const manager = await Manager.findByPk(manager_id);

        if (!manager)
          return res.status(404).send({ erro: "gerente não existe" });

        user.manager_id = manager_id;
      }

      await user.save();

      res.send(user);
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
