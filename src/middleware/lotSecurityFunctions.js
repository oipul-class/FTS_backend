const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const auth = require("../config/auth");
const Branch = require("../models/Branch");
const Company = require("../models/Company");
const Permission = require("../models/Permission");
const User = require("../models/User");
const Lot = require("../models/Lot");
const Screen = require("../models/Screen");

module.exports = {
  lotUpdateCheck: async (req, res, next) => {
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
              required: true,
              include: {
                model: Screen,
                required: true,
                where: {
                  route: "/inventory"
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
              "Usuário não é permitido alterar dados de um item no inventario da filial",
          });

        const { id } = req.params;

        const lot = await Lot.findByPk(id, {
          include: {
            association: "logbook_inventories",
            attributes: ["id"],
            include: {
              model: Branch,
              attributes: ["id"],
            },
          },
        });

        if (!lot)
          return res.status(404).send({ error: "Lot requesitado não existe" });
        if (lot.logbook_inventories[0].Branch.id != user.Branch.id)
          return res.status(400).send({
            error:
              "Lot requesitado pertence a um item no inventario de uma filial que o usuário não trabalha",
          });

        return next();
      } else if (payload.cnpj) {
        const { id } = req.params;

        const lot = await Lot.findByPk(id, {
          include: {
            association: "logbook_inventories",
            attributes: ["id"],
            include: {
              model: Branch,
              attributes: ["id"],
            },
          },
        });

        if (!lot)
          return res.status(404).send({ error: "Lot requesitado não existe" });

        const user = await Company.findOne({
          where: {
            id: payload.id,
            cnpj: payload.cnpj,
          },
          include: [
            {
              model: Permission,
              required: true,
              include: {
                model: Screen,
                required: true,
                where: {
                  route: "/inventory"
                },
              },
            },
            {
              model: Branch,
              attributes: ["id"],
              required: true,
              where: {
                id: lot.logbook_inventories[0].Branch.id,
              },
            },
          ],
        });

        if (!user.Permissions[0] || !user.Permissions[0].Screens[0])
          return res.status(400).send({
            error:
              "Companhia logada não tem permissão para alterar dados de um lot",
          });

        if (lot.logbook_inventories[0].Branch.id != user.Branches[0].id)
          return res.status(400).send({
            error:
              "Lot requesitado pertence a um item no inventario é de uma filial que não pertence a companhia logada",
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
