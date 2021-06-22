const jwt = require("jsonwebtoken");
const auth = require("../config/auth");
const Purchase = require("../models/Purchase");
const Branch = require("../models/Branch");
const Permission = require("../models/Permission");
const User = require("../models/User");
const Screen = require("../models/Screen");

module.exports = {
  userStoreCheck: async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const [Bearer, retriviedToken] = token.split(" ");

      const payload = jwt.verify(retriviedToken, auth.secret);

      const { branch_id } = req.body;

      if (!payload.id && !payload.user_cpf)
        return res
          .status(400)
          .send({ error: "Usuário logado não é um funcionario" });

      const user = await User.findOne({
        where: {
          id: payload.id,
          cpf: payload.user_cpf,
        },
        include: [
          {
            model: Permission,
            include: {
              model: Screen,
              require: true,
              where: {
                id: 8,
              },
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

      if (!user.Permissions[0])
        return res.status(400).send({
          error: "Usuario logado não tem permissão para cadastrar uma compra",
        });

      if (!user.Branch)
        return res.status(400).send({
          error:
            "Usuario logado não pertence a filial requesitada para cadastrar a compra",
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

      if (!payload.user_rg  && !payload.user_cpf)
        return res
          .status(400)
          .send({ error: "Usuário logado não é um funcionario" });

      const user = await User.findOne({
        where: {
          id: payload.id,
          cpf: payload.user_cpf,
        },
        include: [
          {
            model: Permission,
            include: {
              model: Screen,
              require: true,
              where: {
                id: 8,
              },
            },
          },
          {
            model: Branch,
            attributes: ["id"],
          },
        ],
      });

      const purchase = await Purchase.findByPk(id, {
        include: {
          model: Branch,
          attributes: ["id"],
        },
      });

      if (!user.Permissions)
        return res.status(400).send({
          error:
            "Usuario logado não tem permissão para uma alterar os dados da compra",
        });

      if (user.Branch.id !== purchase.Branch.id)
        return res.status(400).send({
          error:
            "Usuario logado não pertence a filial requesitada para alterar os dados da compra",
        });

      next();
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
