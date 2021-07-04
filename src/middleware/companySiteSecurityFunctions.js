const Company = require("../models/Company");
const jwt = require("jsonwebtoken");
const auth = require("../config/auth");

module.exports = {
  companySiteCheck: async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const [Bearer, retriviedToken] = token.split(" ");

      const payload = jwt.verify(retriviedToken, auth.secret);

      if (!payload.cnpj)
        return res
          .status(400)
          .send({ error: "Usuário logado não é uma companhia" });

      const { company_id } = req.params;

      const company = await Company.findOne({
        where: {
          id: company_id,
          cnpj: payload.cnpj,
        },
      });

      if (!company)
        return res.status(400).send({
          error: "Companhia logada não é a mesma requesitada",
        });

      next();
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
