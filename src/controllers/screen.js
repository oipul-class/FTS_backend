const Screen = require("../models/Screen");

module.exports = {
  async index(req, res) {
    try {
      const screens = await Screen.findAll({
        attributes: ["id", "screen_name", "route"],
        include: [
          {
            association: "Permission",
            attributes: ["id", "permission_name"],
            through: { attributes: [] },
          },
        ],
      });

      res.send(screens);
    } catch (error) {
      res.status(500).send({ error: error });
    }
  },

  async find(req, res) {},

  async store(req, res) {
    const { screen_name, route } = req.body;

    try {
    } catch (error) {}
  },

  async update(req, res) {},

  async delete(req, res) {},
};
