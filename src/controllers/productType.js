const ProductType = require("../models/ProductType");
const { Op } = require("sequelize");

module.exports = {
  async index(req, res) {
    try {
      const { type } = req.body;

      let productTypes;

      if (type)
        productTypes = await ProductType.findAll({
          where: {
            type: { [Op.substring]: type },
          },
        });
      else productTypes = await ProductType.findAll();

      res.send(productTypes);
    } catch (error) {
      console.error(error);
      res.send(error);
    }
  },

  async find(req, res) {
    try {
      const { id } = req.params;

      const productType = await ProductType.findByPk(id);

      res.send(productType);
    } catch (error) {
      console.error(error);
      res.send(error);
    }
  },
};
