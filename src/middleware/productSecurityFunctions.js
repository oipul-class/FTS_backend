const User = require("../models/User");
const Permission = require("../models/Permission");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const auth = require("../config/auth");
const Branch = require("../models/Branch");
const Company = require("../models/Company");
const Product = require("../models/Product");
const Screen = require("../models/Screen");

module.exports = {
  productStoreCheck: async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const [Bearer, retriviedToken] = token.split(" ");

      const payload = jwt.verify(retriviedToken, auth.secret);

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
                required: true,
                where: {
                  route: "/productsRegister",
                },
              },
            },
            {
              model: Branch,
              attributes: ["id"],
              include: {
                model: Company,
                attributes: ["id"],
              },
            },
          ],
        });

        if (!user.Permissions[0])
          return res.status(400).send({
            error:
              "Usuário logado não tem permissão de cadastrar produto na companhia",
          });

        const { company_id } = req.body;

        if (user.Branch.Company.id != company_id)
          return res.status(400).send({
            error:
              "Usuário logado não é funcionario de uma filial da companhia enviada nos dados do produto",
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
                required: true,
                where: {
                  route: "/productsRegister",
                },
              },
            },
            {
              model: Branch,
              attributes: ["id"],
              include: {
                model: Company,
                attributes: ["id"],
              },
            },
          ],
        });

        if (!user.Permissions[0] || !user.Permissions[0].Screens[0])
          return res.status(400).send({
            error:
              "Companhia logada não tem permissão de cadastrar produto na companhia",
          });

        const { company_id } = req.body;

        if (user.id != company_id)
          return res.status(400).send({
            error: "Companhia recebida não é a mesma que esta logada",
          });

        return next();
      }

      return res.status(404).send({ error: "Dados para verificação faltando" });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  productUpdateCheck: async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const [Bearer, retriviedToken] = token.split(" ");

      const payload = jwt.verify(retriviedToken, auth.secret);

      if (payload.user_cpf && payload.user_rg) {
        const user = await User.findOne({
          where: {
            id: payload.id,
            cpf: payload.cpf,
          },
          include: [
            {
              model: Permission,
              include: {
                model: Screen,
                required: true,
                where: {
                  route: "/productsRegister",
                },
              },
            },
            {
              model: Branch,
              attributes: ["id"],
              include: {
                model: Company,
                attributes: ["id"],
              },
            },
          ],
        });

        if (!user.Permission)
          return res.status(400).send({
            error:
              "Usuário logado não tem permissão para alterar dados de produtos cadastrados na companhia",
          });

        const { company_id } = req.body;

        if (user.Branch.Company.id != company_id)
          return res.status(400).send({
            error:
              "Usuário logado não é funcionario de uma filial da companhia enviada nos dados do produto",
          });

        const { id } = req.params;

        const product = await Product.findOne({
          where: {
            id,
            company_id,
          },
        });

        if (!product)
          return res.status(400).send({
            error:
              "Produto requesitado a ser alterado não pertence ou não esta cadastrado na companhia",
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
                required: true,
                where: {
                  route: "/productsRegister",
                },
              },
            },
            {
              model: Branch,
              attributes: ["id"],
              include: {
                model: Company,
                attributes: ["id"],
              },
            },
          ],
        });

        if (!user.Permissions[0] || !user.Permissions[0].Screens)
          return res.status(400).send({
            error:
              "Comapnhia logada não tem permissão para alterar dados de produtos cadastrados",
          });

        const { id } = req.params;

        const product = await Product.findOne({
          where: {
            id,
            company_id: user.id,
          },
        });

        if (!product)
          return res.status(400).send({
            error:
              "Produto requesitado a ser alterado não pertence ou não esta cadastrado na companhia",
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
