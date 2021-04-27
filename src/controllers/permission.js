const Permission = require("../models/Permission");

module.exports = {
  async index(req, res) {
    try {
      const response = await Permission.findAll({
        attributes: ["id", "permission_name"],
        include: {
          association: "Screens",
          attributes: ["id", "screen_name"],
        },
      });

      res.send(response);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async find(req, res) {
    const permissionId = req.params.id;

    try {
      const response = await Permission.findByPk(permissionId, {
        attributes: ["id", "permission_name"],
      });

      res.send(response);
    } catch (error) {
      res.status(500).send(error);
    }
  },
};
