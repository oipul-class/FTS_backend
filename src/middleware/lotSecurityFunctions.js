const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const auth = require("../config/auth");
const Branch = require("../models/Branch");
const Company = require("../models/Company");
const Permission = require("../models/Permission");
const User = require("../models/User");
const Lot = require("../models/Lot");

module.exports = {
  lotUpdateCheck: async (req, res, next) => {
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

      next();
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
