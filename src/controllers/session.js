const bcryptjs = require("bcryptjs");
const Company = require("../models/Company")
const User = require("../models/User");
const Branch = require("../models/Branch");
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
        }
      });

      if (!company || !bcryptjs.compareSync(password, company.companie_password)) {
        const user = await User.findOne({
          where: {
            cpf: cnpj_ou_cpf,
          },
        });

        if (
          !user ||
          !bcryptjs.compareSync(password, user.user_password)
        )
          return res.status(404).send({ erro: "usuario não existe" });
        else {
          const token = generateToken({
            id: user.id,
            user_name: user.user_name,
          });

          return res.status(201).send({
            user: {
              id: user.id,
              user_name: user.user_name,
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
            id: company.id,
            fantasy_name: company.fantasy_name,
            branches: company.Branches,
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
