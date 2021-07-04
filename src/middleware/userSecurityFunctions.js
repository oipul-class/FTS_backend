const jwt = require("jsonwebtoken");
const auth = require("../config/auth");
const Permission = require("../models/Permission");
const User = require("../models/User");
const Screen = require("../models/Screen");
const Branch = require("../models/Branch");
const Company = require("../models/Company");
const user = require("../controllers/user");

module.exports = {
  userStoreCheck: async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const [Bearer, retriviedToken] = token.split(" ");

      const payload = jwt.verify(retriviedToken, auth.secret);

      const { branch_id } = req.body;

      if (payload.id && payload.cnpj) {
        const companyFromPayload = await Company.findOne({
          where: {
            id: payload.id,
            cnpj: payload.cnpj,
          },
          include: {
            model: Branch,
            required: true,
            attributes: ["id"],
            where: {
              id: branch_id,
            },
          },
        });

        if (!companyFromPayload)
          return res.status(400).send({
            error:
              "Usuário não pode ser criado por que foi enviado um filial que não pertence a companhia logada",
          });
      } else if (payload.id && payload.user_cpf) {
        const userAdmin = await User.findOne({
          where: {
            id: payload.id,
          },
          include: [
            {
              model: Permission,
              include: {
                model: Screen,
                require: true,
                where: {
                  route: "/usersRegister",
                },
              },
            },
            {
              model: Branch,
              required: true,
              attributes: ["id"],
              where: {
                id: branch_id,
              },
            },
          ],
        });

        if (!userAdmin.Permissions[0])
          return res.status(400).send({
            error:
              "Usuario logado não tem permissão para criar um usuário novo",
          });

        if (!userAdmin.Branch)
          return res.status(400).send({
            error:
              "Usuario logado não pertence a filial requesitada para criar um usuario novo",
          });
      }

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

      if (payload.user_cpf && payload.user_rg) {
        const userByPayload = await User.findByPk(payload.id);

        const userByParams = await User.findByPk(id);

        if (!userByParams || !userByPayload)
          return res
            .status(404)
            .send({ error: "Usuario logado ou requesitado não existe" });

        if (userByPayload.id != userByParams.id) {
          const userAdmin = await User.findOne({
            where: {
              id: userByPayload.id,
            },
            include: {
              model: Permission,
              include: {
                model: Screen,
                require: true,
                where: {
                  route: "/usersRegister",
                },
              },
            },
          });

          if (!userAdmin.Permission)
            return res.status(400).send({
              error:
                "Usuario logado não tem permissão para alterar dados de um usuário",
            });

          if (!userAdmin.Branch)
            return res.status(400).send({
              error: "Usuario logado não pertence a filial requesitada",
            });
        }
      } else if (payload.cnpj) {
        const userByParams = await User.findByPk(id, {
          include: {
            model: Branch,
          },
        });

        const company = await Company.findOne({
          where: {
            id: payload.id,
            cnpj: payload.cnpj,
          },
        });


        if (userByParams.Branch.company_id != company.id)
          return res
            .status(400)
            .send({
              error:
                "Funcionario requesitado não pertence a uma filial da companhia logada",
            });
      } else
        return res
          .status(400)
          .send({ error: "Dados para verificação faltando" });

      next();
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
