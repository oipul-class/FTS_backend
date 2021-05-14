const ItemSale = require("../models/ItemSale");
const LogBookInventory = require("../models/LogBookInventory");

module.exports = {
  async index(req, res) {
    try {
      const itemSales = await ItemSale.findAll();

      res.send(itemSales);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async find(req, res) {
    try {
      const { id } = req.params;

      const itemSale = await ItemSale.findByPk(id);

      res.send(itemSale);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async store(req, res) {
    try {
      const { quantity, logbook_invetory_id } = req.body;

      const logbook = await LogBookInventory.findByPk(logbook_invetory_id);

      if (!logbook) return res.status(404).send({ erro: "logbook não existe" });

      const itemSale = await ItemSale.create({
        cost_per_item: logbook.cost_per_item,
        quantity,
        total_value: logbook.cost_per_item * quantity,
        logbook_invetory_id: logbook_invetory_id,
      });

      res.status(201).send(itemSale);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;

      const { quantity } = req.params;

      const itemSale = await ItemSale.findByPk(id);

      if (!itemSale)
        return res
          .status(404)
          .send({ erro: "item no carrinho de venda não existe" });

      if (quantity && quantity >= 1) {
        itemSale.quantity = quantity;
        itemSale.total_value = logbook.cost_per_item * quantity;
      }

      await itemSale.save();

      res.send(itemSale);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;

      const itemSale = await ItemSale.findByPk(id);

      if (!itemSale)
        return res
          .status(404)
          .send({ erro: "item no carrinho de venda não existe" });

      await itemSale.destroy();

      res.send();
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
