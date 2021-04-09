const bcryptjs = require("bcryptjs");
const Company = require("../models/Company");
const Branch = require("../models/Branch");
const Role = require("../models/Role")
const Manager = require("../models/Manager");
const { generateToken } = require("../utils");

module.exports = {
  async store(req, res) {
    const { cnpj_ou_cpf, password } = req.body;

    try {
      const company = await Company.findOne({
        where: {
          cnpj: cnpj_ou_cpf,
        },
        include: {
          model: Branch,
        },
      });

      if (!company || !bcryptjs.compareSync(password, company.adm_password)) {
        const manager = await Manager.findOne({
          where: {
            cpf: cnpj_ou_cpf,
          },
          include: {
            model: Role,
          }
        });

        if (
          !manager ||
          !bcryptjs.compareSync(password, manager.manager_password)
        )
          return res.status(404).send({ erro: "admin ou gerente não existe" });
        else {
          const token = generateToken({
            id: manager.id,
            manager_name: manager.manager_name,
          });

          return res.status(201).send({
            user: {
              manager_name: manager.manager_name,
              manager_role: manager.Role.role_name,

            },
            token: token,
          });
        }
      } else {
        const token = generateToken({
          id: company.id,
          fantasy_name: company.fantasy_name,
        });

        return res.status(201).send({
          user: {
            fantasy_name: company.fantasy_name,
            branches: company.Branches
          },
          token: token,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
