const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const auth = require("../config/auth");
const Permission = require("../models/Permission");
const User = require("../models/User");

module.exports = {
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
            require: true,
            where: {
              permission_name: { [Op.substring]: "Administrador" },
            },
          },
        });

        if (!userAdmin)
          return res.status(400).send({
            error:
              "Usiario requesitado não é o mesmo que esta logado ou não tem permissão para fazer modificações no usuário requesitado",
          });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
