const LogBookInventory = require("../models/LogBookInventory");

module.exports = {
  verfityItem: async (req, res, next) => {
    try {
      const { product_id } = req.body;

      const logbook = await LogBookInventory.findOne({
        where: {
          product_id,
        },
      });

      if (!logbook)
        return res
          .status(400)
          .send({ error: "O produto enviado não tem inventario na filial" });

      next()
    } catch (error) {
      console.error(error);
      res.status(500);
    }
  },

  verfityArrayOfItems: async (req, res, next) => {
    try {
      const { items } = req.body;

      await Promise.all(
        items.map(async (item) => {
          const logbook = await LogBookInventory.findOne({
            where: {
              product_id: item.product_id,
            },
          });

          if (!logbook)
            return res.status(400).send({
              error: "Um item da lista não tem inventario na filial",
            });
        })
      );

      next();
    } catch (error) {
      console.error(error);
      res.status(500);
    }
  },
};
