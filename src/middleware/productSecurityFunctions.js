const User = require("../models/User");
const Permission = require("../models/Permission");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const auth = require("../config/auth");
const Branch = require("../models/Branch");
const Company = require("../models/Company");
const Product = require("../models/Product");
const Screen = require("../models/Screen")

module.exports = {
  productStoreCheck: async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const [Bearer, retriviedToken] = token.split(" ");

      const payload = jwt.verify(retriviedToken, auth.secret);

      if (!payload.user_cpf || !payload.user_rg)
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
            include: {
              model: Screen,
              required: true,
              where: {
                id: 2,
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

      console.log(user);
      

      if (!user)
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

      next();
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

      if (!payload.user_cpf || !payload.user_rg)
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
            include: {
              model: Screen,
              required: true,
              where: {
                id: 2,
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

      next();
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
