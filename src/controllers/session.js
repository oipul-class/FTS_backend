const bcryptjs = require("bcryptjs");
const Company = require("../models/Company");
const User = require("../models/User");
const Branch = require("../models/Branch");
const { generateToken } = require("../utils");
const Role = require("../models/Role");

module.exports = {
  async store(req, res) {
    const { cnpj_ou_cpf, password } = req.body;

    try {
      const company = await Company.findOne({
        where: {
          cnpj: cnpj_ou_cpf,
        },
        include: [
          {
            model: Branch,
          },
          {
            association: "Permissions",
            attributes: ["id", "permission_name"],
            through: { attributes: [] },
            include: {
              association: "Screens",
              attributes: ["id", "screen_name", "route"],
            },
          },
        ],
      });

      if (
        !company ||
        !bcryptjs.compareSync(password, company.companie_password)
      ) {
        const user = await User.findOne({
          where: {
            cpf: cnpj_ou_cpf,
          },
          include: [
            {
              model: Branch,
            },
            {
              model: Role,
            },
            {
              association: "Permissions",
              attributes: ["id", "permission_name"],
              through: { attributes: [] },
              include: {
                association: "Screens",
                attributes: ["id", "screen_name", "route"],
              },
            },
          ],
        });

        if (!user || !bcryptjs.compareSync(password, user.user_password))
          return res.status(404).send({ error: "Usuário/senha incorretos" });
        else {
          const token = generateToken({
            id: user.id,
            user_name: user.user_name,
            user_cpf: user.cpf,
            user_rg: user.rg,
            user_branch_id: user.branch_id,
            user_role_id: user.user_role_id,
          });

          return res.status(201).send({
            user: {
              id: user.id,
              user_name: user.user_name,
              user_cpf: user.cpf,
              user_rg: user.rg,
              user_role_id: user.user_role_id,
              branch: user.Branch,
              role: user.role,
              permissions: user.Permissions,
            },
            token: token,
          });
        }
      } else {
        const token = generateToken({
          id: company.id,
          cnpj: company.cnpj,
          fantasy_name: company.fantasy_name,
        });

        return res.status(201).send({
          user: {
            id: company.id,
            fantasy_name: company.fantasy_name,
            branch: company.Branches,
            permissions: company.Permissions,
          },
          token: token,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
