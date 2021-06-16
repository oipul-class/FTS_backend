const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const auth = require("../config/auth");
const User = require("../models/User");
const Permission = require("../models/Permission");

module.exports = {
  costumerStoreCheck: async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const [Bearer, retriviedToken] = token.split(" ");

      const payload = jwt.verify(retriviedToken, auth.secret);

      if (!payload.user_cpf || !payload.user_rg)
        return res
          .status(400)
          .send({ error: "Usuário logado não é um funcionario" });

      const user = await User.findOne({
        where: {
          id: payload.id,
        },
        include: {
          model: Permission,
          required: true,
          where: {
            permission_name: { [Op.substring]: "Caixa" },
          },
        },
      });

      if (!user)
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
