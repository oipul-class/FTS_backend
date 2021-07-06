const jwt = require("jsonwebtoken");
const auth = require("../config/auth");
const Branch = require("../models/Branch");
const Permission = require("../models/Permission");
const User = require("../models/User");
const Screen = require("../models/Screen");
const Sale = require("../models/Sale");
const Company = require("../models/Company");

module.exports = {
  userStoreCheck: async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const [Bearer, retriviedToken] = token.split(" ");

      const payload = jwt.verify(retriviedToken, auth.secret);

      const { branch_id } = req.body;

      if (payload.user_cpf && payload.user_rg) {
        console.log("user is a usuário");
        const user = await User.findOne({
          where: {
            id: payload.id,
            cpf: payload.user_cpf,
          },
          include: [
            {
              model: Permission,
              attributes: ["id"],
              include: {
                model: Screen,
                require: true,
                where: {
                  route: "/pdv",
                },
                attributes: ["id"],
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
            error: "Usuario logado não tem permissão para criar uma venda",
          });

        if (!user.Branch)
          return res.status(400).send({
            error:
              "Usuario logado não pertence a filial requesitada para criar uma venda",
          });

        return next();
      } else if (payload.cnpj) {
        const user = await Company.findOne({
          where: {
            id: payload.id,
            cnpj: payload.cnpj,
          },
          include: [
            {
              model: Permission,
              attributes: ["id"],
              include: {
                model: Screen,
                require: true,
                where: {
                  route: "/pdv",
                },
                attributes: ["id"],
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

        if (!user.Permissions[0] || !user.Permissions[0].Screens)
          return res.status(400).send({
            error: "Companhia logada não tem permissão para criar uma venda",
          });

        if (!user.Branch)
          return res.status(400).send({
            error:
              "Filial requesitada da venda não pertence a companhia logada",
          });

        return next();
      }
      return res.status(404).send({ error: "Dados para verificação faltando" });
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

      if (payload.user_rg || payload.user_rg) {
        const user = await User.findOne({
          where: {
            id: payload.id,
            cpf: payload.user_cpf,
          },
          include: [
            {
              model: Permission,
              attributes: ["id"],
              include: {
                model: Screen,
                require: true,
                where: {
                  route: "/pdv",
                },
                attributes: ["id"],
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
            error:
              "Usuario logado não tem permissão para alterar os dados da venda",
          });

        if (user.Branch.id !== sale.Branch.id)
          return res.status(400).send({
            error:
              "Usuario logado não pertence a filial requesitada para alterar os dados da venda",
          });

        return next();
      } else if (payload.cnpj) {
        const user = await Company.findOne({
          where: {
            id: payload.id,
            cnpj: payload.cnpj,
          },
          include: [
            {
              model: Permission,
              attributes: ["id"],
              include: {
                model: Screen,
                require: true,
                where: {
                  route: "/pdv",
                },
                attributes: ["id"],
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
            error:
              "Companhia logada não tem permissão para alterar os dados da venda",
          });

        if (user.Branch.id !== sale.Branch.id)
          return res.status(400).send({
            error: "Filial da venda não pertence a companhia logada",
          });

        return next();
      }

      return res.status(404).send({ error: "Dados para verificação faltando" });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
