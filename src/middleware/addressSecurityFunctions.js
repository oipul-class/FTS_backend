const jwt = require("jsonwebtoken");
const auth = require("../config/auth");
const Address = require("../models/Address");
const Company = require("../models/Company");
const Branch = require("../models/Branch");

module.exports = {
  addressUpdateCheck: async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const [Bearer, retriviedToken] = token.split(" ");

      const { id } = req.params;

      const payload = jwt.verify(retriviedToken, auth.secret);

      if (!payload.cnpj)
        return res
          .status(404)
          .send({ error: "Usuário logado não é uma companhia" });

      const addressCompany = await Address.findByPk(id, {
        include: {
          require: true,
          model: Company,
          attributes: ["id"],
          where: {
            id: payload.id,
            cnpj: payload.cnpj
          }
        }
      });

      const addressBranch = await Address.findByPk(id, {
        include: {
          require: true,
          model: Branch,
          attributes: ["id"],
          include: {
            require: true,
            model: Company,
            where: {
              id: payload.id,
              cnpj: payload.cnpj
            }
          }
        }
      });

      if(!addressCompany&& !addressBranch) return res.status(400).send({ error: "Endereço não é da companhia logada"})

      next();
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
