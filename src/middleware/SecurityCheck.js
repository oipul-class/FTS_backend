const jwt = require("jsonwebtoken");
const auth = require("../config/auth");
const Branch = require("../models/Branch");
const Company = require("../models/Company");
const User = require("../models/User");
const purchase = require("../controllers/purchase");

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

      if (!branch)
        return res.status(400).send({
          error: "Filial não existe ou não pertence a companhia logada",
        });

      next();
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  userUpdateCheck: async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const [Bearer, retriviedToken] = token.split(" ");

      const { id } = req.params;

      const payload = jwt.verify(retriviedToken, auth.secret);


      if (!payload.user_cpf && !payload.user_rg)
        return res
          .status(400)
          .send({ error: "Usuario logado não é um funcionario" });

      const userByPayload = await User.findByPk(payload.id);

      const userByParams = await User.findByPk(id);

      if (!userByParams || !userByPayload) return res.status(404).send({error: "Usuario logado ou requesitado não existe"})

      if (userByPayload.id != userByParams.id)
        return res
          .status(400)
          .send({ error: "Usiario requesitado não é o mesmo que esta logado" });

      next();
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
