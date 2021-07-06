const jwt = require("jsonwebtoken");
const auth = require("../config/auth");
const Purchase = require("../models/Purchase");
const Branch = require("../models/Branch");
const Permission = require("../models/Permission");
const User = require("../models/User");
const Screen = require("../models/Screen");
const Company = require("../models/Company");

module.exports = {
  userStoreCheck: async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const [Bearer, retriviedToken] = token.split(" ");

      const payload = jwt.verify(retriviedToken, auth.secret);

      const { branch_id } = req.body;

      if (payload.user_cpf && payload.user_rg) {
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
                  route: "/purchases",
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
              include: {
                model: Screen,
                require: true,
                where: {
                  route: "/purchases",
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

        if (!user.Permissions[0] || !user.Permissions[0].Screens)
          return res.status(400).send({
            error:
              "Companhia logada não tem permissão para cadastrar uma compra",
          });

        if (!user.Branches[0])
          return res.status(400).send({
            error:
              "Filial relacionada a compra não pertence a companhia logada",
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

      if (payload.user_cpf || payload.user_rg) {
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
                  route: "/purchases",
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

        return next();
      } else if (payload.cnpj) {
        const purchase = await Purchase.findByPk(id, {
          include: {
            model: Branch,
            attributes: ["id"],
          },
        });

        const user = await Company.findOne({
          where: {
            id: payload.id,
            cnpj: payload.cnpj,
          },
          include: [
            {
              model: Permission,
              include: {
                model: Screen,
                require: true,
                where: {
                  route: "/purchases",
                },
              },
            },
            {
              where: {
                id: purchase.Branch.id,
              },
              model: Branch,
              attributes: ["id"],
            },
          ],
        });

        if (!user.Permissions)
          return res.status(400).send({
            error:
              "Companhia logada não tem permissão para uma alterar os dados da compra",
          });

        if (user.Branches[0].id != purchase.Branch.id)
          return res.status(400).send({
            error: "Filial da compra não é da companhia logada",
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
