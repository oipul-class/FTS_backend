const jwt = require("jsonwebtoken");
const auth = require("../config/auth");
const Branch = require("../models/Branch");
const Company = require("../models/Company");

module.exports = {
  CompanyUpdateCheck: async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const [Bearer, retriviedToken] = token.split(" ");

      const { id } = req.params;

      const payload = jwt.verify(retriviedToken, auth.secret);

      const companyFromPayload = await Company.findOne({
        where: {
          id: payload.id,
          cnpj: payload.cnpj,
        },
      });

      const companyFromParams = await Company.findByPk(id);

      if (!companyFromPayload)
        return res
          .status(404)
          .send({ error: "Companhia que fez a requesição não existe" });

      if (!companyFromPayload.cnpj)
        return res
          .status(400)
          .send({ error: "Quem que fez a requesição não é uma Companhia" });

      if (
        companyFromPayload.id != companyFromParams.id ||
        companyFromPayload.cpf != companyFromParams.cpf
      )
        return res.status(400).send({
          error:
            "Companhia requisitada a ser modificada não é a mesma que esta logada",
        });

      next();
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  BranchUpdateCheck: async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const [Bearer, retriviedToken] = token.split(" ");

      const { id } = req.params;

      const payload = jwt.verify(retriviedToken, auth.secret);

      const companyFromPayload = await Company.findOne({
        where: {
          id: payload.id,
          cnpj: payload.cnpj,
        },
      });

      if (!companyFromPayload)
        return res
          .status(404)
          .send({ error: "Companhia que fez a requesição não existe" });

      if (!companyFromPayload.cnpj)
        return res
          .status(400)
          .send({ error: "Quem que fez a requesição não é uma Companhia" });

      const branch = await Branch.findOne({
        where: {
          id,
          company_id: companyFromPayload.id,
        },
      });

      if (!branch) return res.status(400).send({ error: "Filial não existe ou não pertence a companhia logada"})

      next();
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
