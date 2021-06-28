const jwt = require("jsonwebtoken");
const auth = require("../config/auth");
const Branch = require("../models/Branch");
const Company = require("../models/Company");
const Permission = require("../models/Permission");
const Product = require("../models/Product");
const Logbook = require("../models/LogBookInventory");
const User = require("../models/User");
const Screen = require("../models/Screen");

module.exports = {
  logbookStoreCheck: async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const [Bearer, retriviedToken] = token.split(" ");

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
                  route: "/inventory",
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
            error: "Produto requesitado não existe ou não pertence a companhia",
          });

        return next();
      } else if (payload.cnpj) {
        const { product_id, branch_id } = req.body;

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
                id: branch_id,
              },
            },
          },
        });

        if (!product)
          return res.status(404).send({ error: "Produto não existe" });

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
                  route: "/inventory",
                },
              },
            },
            {
              model: Branch,
              attributes: ["id"],
              required: true,
              where: {
                id: branch_id,
              },
            },
          ],
        });

        if (!user.Permissions[0] || !user.Permissions[0].Screens[0])
          return res.status(400).send({
            error: "Usuário não é permitido criar item no inventario da filial",
          });

        if (!user.Branches[0])
          return res.status(404).send({
            error: "Filial requesitada não pertence a companhia logada",
          });

        return next();
      }

      return res.status(404).send({ error: "Dados para verificação faltando" });
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
                  route: "/inventory",
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

        if (!user)
          return res.status(400).send({
            error: "Usuário não é permitido criar item no inventario da filial",
          });

        const { id } = req.params;

        const logbook = await Logbook.findByPk(id, {
          attributes: ["id"],
          include: {
            model: Branch,
            attributes: ["id"],
          },
        });

        if (!product)
          return res.status(404).send({
            error: "Produto requesitado não existe ou não pertence a companhia",
          });

        if (!logbook.Branch.id != user.Branch.id)
          return res.status(400).send({
            error:
              "Produto requesitado não pertence a companhia dona da filial que o usuário logado trabalha",
          });
        return next();
      } else if (payload.cnpj) {
        const { id } = req.params;

        const logbook = await Logbook.findByPk(id, {
          attributes: ["id"],
          include: {
            model: Branch,
            attributes: ["id"],
          },
        });

        if (!logbook)
          return res
            .status(404)
            .send({ error: "Item no inventario não existe" });

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
                  route: "/inventory",
                },
              },
            },
            {
              model: Branch,
              attributes: ["id"],
              required: true,
              where: {
                id: logbook.Branch.id,
              },
            },
          ],
        });

        if (!user.Permissions[0] || !user.Permissions[0].Screens[0])
          return res.status(400).send({
            error:
              "Comapnhia não tem permissão para cadastrar um produto no inventario",
          });

        if (!user.Branches[0])
          return res.status(400).send({
            error:
              "Produto requesitado não pertence a companhia dona da filial que o usuário logado trabalha",
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
