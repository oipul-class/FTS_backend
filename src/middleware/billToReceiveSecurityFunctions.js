const jwt = require("jsonwebtoken");
const auth = require("../config/auth");
const User = require("../models/User");
const BillToReceive = require("../models/BillToReceive");
const Sale = require("../models/Sale");
const Permission = require("../models/Permission");
const Screen = require("../models/Screen");
const Branch = require("../models/Branch");
const Company = require("../models/Company");

module.exports = {
  userUpdateCheck: async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const [Bearer, retriviedToken] = token.split(" ");

      const { id } = req.params;

      const payload = jwt.verify(retriviedToken, auth.secret);

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
                  route: ""
                },
              },
            },
            {
              model: Branch,
              attributes: ["id"],
            },
          ],
        });

        if (!user.Permissions[0])
          return res.status(400).send({
            error:
              "Usuario logado não tem permissão para alterar dados de uma conta",
          });

        const bill = await BillToReceive.findOne({
          where: {
            id,
          },
          include: {
            model: Sale,
            required: true,
            where: {
              branch_id: user.Branch.id,
            },
          },
        });

        if (!bill || !bill.Sale)
          return res.status(404).send({
            error:
              "Conta requesitada não existe ou não pertence a filial do conta logada",
          });

        return next();
      } else if (payload.cnpj) {
        const bill = await BillToReceive.findOne({
          where: {
            id,
          },
          include: {
            model: Sale,
            required: true,
          },
        });

        if (!bill)
          return res.status(404).send({
            error: "Conta requesitada não existe",
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
                  route: ""
                },
              },
            },
            {
              model: Branch,
              attributes: ["id"],
              required: true,
              where: {
                id: bill.Sale.BranchId,
              },
            },
          ],
        });

        if (!user.Permissions[0] || !user.Permissions[0].Screens[0])
          return res.status(400).send({
            error:
              "Usuario logado não tem permissão para alterar dados de uma conta",
          });

        if (!user)
          return res.status(404).send({
            error:
              "Conta requesitada é de uma venda que não pertence a uma filial da companhia logada",
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
