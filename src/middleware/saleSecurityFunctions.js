const jwt = require("jsonwebtoken");
const auth = require("../config/auth");
const Branch = require("../models/Branch");
const Permission = require("../models/Permission");
const User = require("../models/User");
const Screen = require("../models/Screen");
const Sale = require("../models/Sale");

module.exports = {
  userStoreCheck: async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const [Bearer, retriviedToken] = token.split(" ");

      const payload = jwt.verify(retriviedToken, auth.secret);

      const { branch_id } = req.body;

      if (!payload.id && !payload.cpf)
        return res
          .status(400)
          .send({ error: "Usuário logado não é um funcionario" });

      const user = await User.findOne({
        where: {
          id: payload.id,
        },
        include: [
          {
            model: Permission,
            attributes: ["id"],
            include: {
              model: Screen,
              require: true,
              where: {
                id: 7,
              },
              attributes: ["id"]
            },
          },
          {
            model: Branch,
            required: true,
            attributes: ["id"],
            where: {
              id: branch_id,
            },
          },
        ],
      });

      if (!user.Permissions)
        return res.status(400).send({
          error: "Usuario logado não tem permissão para criar uma venda",
        });

      if (!user.Branch)
        return res.status(400).send({
          error:
            "Usuario logado não pertence a filial requesitada para criar uma venda",
        });

      next();
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  userUpdateCheck: async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const [Bearer, retriviedToken] = token.split(" ");

      const payload = jwt.verify(retriviedToken, auth.secret);

      const { id } = req.params;

      if (!payload.id && !payload.cpf)
        return res
          .status(400)
          .send({ error: "Usuário logado não é um funcionario" });

      const user = await User.findOne({
        where: {
          id: payload.id,
        },
        include: [
          {
            model: Permission,
            attributes: ["id"],
            include: {
              model: Screen,
              require: true,
              where: {
                id: 7,
              },
              attributes: ["id"]
            },
          },
          {
            model: Branch,
            attributes: ["id"],
          },
        ],
      });

      const sale = await Sale.findByPk(id, {
        include: {
          model: Branch,
          attributes: ["id"],
        },
      });

      if (!user.Permissions)
        return res.status(400).send({
          error: "Usuario logado não tem permissão para alterar os dados da venda",
        });

      if (user.Branch.id !== purchase.Branch.id)
        return res.status(400).send({
          error:
            "Usuario logado não pertence a filial requesitada para alterar os dados da venda",
        });

      next();
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
