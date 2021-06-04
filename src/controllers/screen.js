const { Op } = require("sequelize");
const Screen = require("../models/Screen");

module.exports = {
  async index(req, res) {
    try {
      const { screen_name } = req.body;

      let screens;

      if (screen_name)
        screens = await Screen.findAll({
          attributes: ["id", "screen_name", "route"],
          where: {
            screen_name: { [Op.substring]: screen_name },
          },
        });
      else
        screens = await Screen.findAll({
          attributes: ["id", "screen_name", "route"],
        });

      res.send(screens);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async find(req, res) {
    try {
      const { id } = req.params;

      const screen = await Screen.findByPk(id, {
        attributes: ["id", "screen_name", "route"],
      });

      res.send(screen);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
