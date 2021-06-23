const jwt = require("jsonwebtoken");
const auth = require("../config/auth");
const User = require("../models/User");
const BillToReceive = require("../models/BillToReceive");
const Sale = require("../models/Sale");
const Permission = require("../models/Permission");
const Screen = require("../models/Screen");
const Branch = require("../models/Branch");

module.exports = {
  userUpdateCheck: async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const [Bearer, retriviedToken] = token.split(" ");

      const { id } = req.params;

      const payload = jwt.verify(retriviedToken, auth.secret);

      const user = await User.findOne({
        where: {
          id: payload.id,
          cpf: payload.user_cpf,
        },
        include: [
          {
            model: Permission,
            include: {
              model: Screen,
              require: true,
              where: {
                id: 5,
              },
            },
          },
          {
            model: Branch,
            attributes: ["id"],
          },
        ],
      });


      if (!user.Permissions[0])
        return res.status(400).send({
          error:
            "Usuario logado não tem permissão para alterar dados de uma conta",
        });

      const bill = await BillToReceive.findOne({
        where: {
          id,
        },
        include: {
          model: Sale,
          required: true,
          where: {
            branch_id: user.Branch.id,
          },
        },
      });

      if (!bill || !bill.Sale)
        return res.status(404).send({
          error:
            "Conta requesitada não existe ou não pertence a filial do conta logada",
        });

      next();
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
