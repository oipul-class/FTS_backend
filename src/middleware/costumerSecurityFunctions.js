const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const auth = require("../config/auth");
const User = require("../models/User");
const Permission = require("../models/Permission");
const Screen = require("../models/Screen");

module.exports = {
  costumerStoreCheck: async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const [Bearer, retriviedToken] = token.split(" ");

      const payload = jwt.verify(retriviedToken, auth.secret);

      if (payload.cnpj) return res.status(400).send({ error: "Usuário logado não é um funcionario"})

      const user = await User.findOne({
        where: {
          id: payload.id,
        },
        include: {
          model: Permission,
          include: {
            model: Screen,
            require: true,
            where: {
              route: "/pdv"
            },
          },
        },
      });

      if (!user.Permissions[0])
        return res.status(400).send({
          error: "Usuário logado não tem permissão para cadastrar um cliente",
        });

      next();
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
