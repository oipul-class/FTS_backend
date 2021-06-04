const { Op } = require("sequelize");
const Permission = require("../models/Permission");

module.exports = {
  async index(req, res) {
    try {
      const { permission_name } = req.body;

      let permissions;

      if (permission_name)
        permissions = await Permission.findAll({
          attributes: ["id", "permission_name"],
          where: {
            permission_name: { [Op.substring]: permission_name },
          },
          include: {
            association: "Screens",
            attributes: ["id", "screen_name"],
          },
        });
      else
        permissions = await Permission.findAll({
          attributes: ["id", "permission_name"],
          include: {
            association: "Screens",
            attributes: ["id", "screen_name"],
          },
        });

      res.send(permissions);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async find(req, res) {
    try {
      const { id } = req.params;

      const screen = await Permission.findByPk(id, {
        attributes: ["id", "permission_name"],
        include: {
          association: "Screens",
          attributes: ["id", "screen_name"],
        },
      });

      res.send(screen);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
