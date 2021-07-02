const jwt = require("jsonwebtoken");
const auth = require("../config/auth");
const Company = require("../models/Company");

module.exports = {
  CompanyUpdateCheck: async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const [Bearer, retriviedToken] = token.split(" ");

      const { id } = req.params;

      const payload = jwt.verify(retriviedToken, auth.secret);


      if (!payload.cnpj)
        return res
          .status(400)
          .send({ error: "Usuario logado não é uma companhia" });

      const companyFromPayload = await Company.findOne({
        where: {
          id: payload.id,
          cnpj: payload.cnpj,
        },
      });

      const companyFromParams = await Company.findByPk(id);

      if (!companyFromParams)
        return res
          .status(404)
          .send({ error: "Companhia que fez a requesição não existe" });

      if (!companyFromPayload.cnpj)
        return res
          .status(400)
          .send({ error: "Quem que fez a requesição não é uma Companhia" });

      if (
        companyFromPayload.id != companyFromParams.id ||
        companyFromPayload.cnpj != companyFromParams.cnpj
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
};
