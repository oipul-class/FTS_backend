const Screen = require("../models/Screen");

module.exports = {
  async index(req, res) {
    try {
      const screens = await Screen.findAll({
        attributes: ["id", "screen_name", "route"],
      });

      res.send(screens);
    } catch (error) {
      res.status(500).send({ error: error });
    }
  },

  async find(req, res) {
    const sreenId = req.params.id;

    try {
      const screen = await Screen.findByPk(sreenId, {
        attributes: ["id", "screen_name", "route"],
      });

      res.send(screen);
    } catch (error) {
      res.status(500).send(error);
    }
  },
};
