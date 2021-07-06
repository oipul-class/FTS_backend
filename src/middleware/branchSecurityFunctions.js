const jwt = require("jsonwebtoken");
const auth = require("../config/auth");
const Branch = require("../models/Branch");
const Company = require("../models/Company");

module.exports = {
  BranchUpdateCheck: async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const [Bearer, retriviedToken] = token.split(" ");

      const { id } = req.params;

      const payload = jwt.verify(retriviedToken, auth.secret);

      if (!payload.cnpj)
        return res
          .status(400)
          .send({ error: "Usuário logado não é uma companhia" });

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

      if (branch.company_id != payload.id)
        return res.status(400).send({
          error: "Filial não existe ou não pertence a companhia logada",
        });

      next();
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
