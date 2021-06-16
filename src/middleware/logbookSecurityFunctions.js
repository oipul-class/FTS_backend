const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const auth = require("../config/auth");
const Branch = require("../models/Branch");
const Company = require("../models/Company");
const Permission = require("../models/Permission");
const Product = require("../models/Product");
const User = require("../models/User");

module.exports = {
  logbookStoreCheck: async (req, res, next) => {
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
            required: true,
            where: {
              permission_name: { [Op.substring]: "Estoque" },
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

      if (!user)
        return res.status(400).send({
          error: "Usuário não é permitido criar item no inventario da filial",
        });

      const { product_id, branch_id } = req.body;

      if (user.Branch.id != branch_id)
        return res.status(400).send({
          error:
            "Usuário não trabalha na filial requesitada para criar um item no inventario",
        });

      const product = await Product.findOne({
        where: {
          id: product_id,
        },
        include: {
          model: Company,
          require: true,
          include: {
            model: Branch,
            require: true,
            where: {
              id: user.Branch.id,
            },
          },
        },
      });

      if (!product)
        return res.status(400).send({
          error:
            "Produto requesitado não existe ou não pertence a companhia",
        });

      next();
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  logbookUpdateCheck: async (req, res, next) => {
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
            required: true,
            where: {
              permission_name: { [Op.substring]: "Estoque" },
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

      if (!user)
        return res.status(400).send({
          error: "Usuário não é permitido criar item no inventario da filial",
        });

      const { id } = req.params;

      const product = await Product.findByPk(id, {
        attributes: ["id"],
        include: {
          model: Company,
          attributes: ["id"],
        },
      });

      if (!product)
        return res
          .status(404)
          .send({ error: "Produto requesitado não existe ou não pertence a companhia" });

      if (!product.Company.id != user.Branch.Company.id)
        return res.status(400).send({
          error:
            "Produto requesitado não pertence a companhia dona da filial que o usuário logado trabalha",
        });
      next();
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
