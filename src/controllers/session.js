const bcryptjs = require("bcryptjs");
const User = require("../models/User");
const Manager = require("../models/Manager");
const { generateToken } = require("../utils");

module.exports = {
  async store(req, res) {
    const { cpf, password } = req.body;

    try {
      const manager = await Manager.findOne({
        where: {
          cpf,
        },
      });
      
      if (!manager || !bcryptjs.compareSync(password, manager.manager_password)) {
        const user = await User.findOne({
          where: {
            cpf,
          },
        });

        if (!user || !bcryptjs.compareSync(password, user.user_password))
          return res
            .status(404)
            .send({ erro: "usuario ou gerente não existe" });
        else {
          const token = generateToken({
            id: user.id,
            user_name: user.user_name,
          });

          return res.status(201).send({
            user: {
              user_name: user.user_name,
            },
            token: token,
          });
        }
      } else {
        const token = generateToken({
          id: manager.id,
          manager_name: manager.manager_name,
        });

        return res.status(201).send({
          user: {
            manager_name: manager.manager_name,
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
