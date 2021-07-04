const jwt = require("jsonwebtoken");
const auth = require("../config/auth");
const Branch = require("../models/Branch");
const Company = require("../models/Company");
const User = require("../models/User");

module.exports = {
  planBranchLimitCheck: async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const [Bearer, retriviedToken] = token.split(" ");

      const payload = jwt.verify(retriviedToken, auth.secret);

      const company = await Company.findByPk(payload.id);

      if (!company)
        return res
          .status(404)
          .send({ error: "Companhia que fez a requesição não existe" });

      const branchAmount = await Branch.count({
        where: {
          company_id: company.id,
        },
      });

      const plan = await company.getPlan();

      if (branchAmount >= plan.branch_limit)
        return res.status(400).send({
          error: `Plano não permite mais que ${plan.branch_limit} filiais`,
        });

      next();
    } catch (error) {}
  },

  planUserPerBranchLimit: async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const [Bearer, retriviedToken] = token.split(" ");

      const payload = jwt.verify(retriviedToken, auth.secret);

      const company = await Company.findByPk(payload.id);

      const user = await User.findByPk(payload.id);

      if (!company && !user)
        return res
          .status(404)
          .send({ error: "Companhia ou Usuario não existe" });

      const { branch_id } = req.body;

      if (company) {
        const branch = await Branch.findByPk(branch_id);

        if (!branch)
          return res
            .status(404)
            .send({ error: "Filial não existe ou não pertence a companhia" });

        const usersCount = await User.count({
          where: {
            branch_id: branch.id,
          },
        });

        const plan = await company.getPlan();

        if (usersCount >= plan.user_limit_per_branch)
          return res.status(400).send({
            error: `plano não permite mais que ${plan.user_limit_per_branch} de usuarios por filial`,
          });

        next();
      }
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  planWebsiteCreate: async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const [Bearer, retriviedToken] = token.split(" ");

      const payload = jwt.verify(retriviedToken, auth.secret);

      const { company_id } = req.params;

      if (!payload.cnpj)
        return res
          .status(400)
          .send({ error: "Usuário logado não é uma companhia" });

      const company = await Company.findOne({
        where: {
          id: payload.id,
          cnpj: payload.cnpj,
        },
      });

      if (company.id != company_id)
        return res.status(400).send({
          error: "Companhia requestida não é a mesma que esta logada",
        });

      const plan = await company.getPlan();

      if (!plan.access_website)
        return res.status(400).send({
          error:
            "Companhia não pode criar um site pois o plano atual não permite",
        });
      next();
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
