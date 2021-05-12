const ItemPurchase = require("../models/ItemPurchase");
const LogBookInventory = require("../models/LogBookInventory");
const Product = require("../models/Product");
const Purchase = require("../models/Purchase");

module.exports = {
  async index(req, res) {
    try {
      const itemPurchases = await ItemPurchase.findAll({
        include: [
          {
            model: LogBookInventory,
          },
          {
            model: Product,
          },
          {
            model: Purchase,
          },
        ],
      });

      res.send(itemPurchases);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async find(req, res) {
    try {
      const { id } = req.params;

      const itemPurchase = await ItemPurchase.findByPk(id, {
        include: [
          {
            model: LogBookInventory,
          },
          {
            model: Product,
          },
          {
            model: Purchase,
          },
        ],
      });

      res.send(itemPurchase);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async store(req, res) {
    try {
      const {
        quantity,
        logbook_invetory_id,
        product_id,
        purchase_id,
      } = req.body;

      const logbook = await LogBookInventory.findByPk(logbook_invetory_id);

      if (!logbook) return res.status(404).send({ erro: "logbook não existe" });

      const product = await Product.findByPk(product_id);
      const purchase = await Purchase.findByPk(purchase_id);

      if (!product || !purchase)
        return res.status(404).send({ erro: "compra ou produto não existe" });

      const itemPurchase = await ItemPurchase.create({
        cost_per_item: logbook.cost_per_item,
        quantity,
        total_value: logbook.cost_per_item * quantity,
        product_id,
        logbook_invetory_id,
        purchase_id,
      });

      res.status(201).send(itemPurchase);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;

      const itemPurchase = await ItemPurchase.findByPk(id);

      if (!itemPurchase)
        return res.status(404).send({ erro: "item no carrinho não existe" });

      await itemPurchase.destroy();

      res.send();
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
