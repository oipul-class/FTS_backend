const ItemSale = require("../models/ItemSale");
const LogBookInventory = require("../models/LogBookInventory");
const Product = require("../models/Product")

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
      const { quantity, discount, product_id, sale_id } = req.body;

      const product = await Product.findByPk(product_id);

      if (!product) return res.status(404).send({ erro: "produto não existe"})

      const logbook = await product.getLogBookInventory();

      if (!logbook) return res.status(404).send({ erro: "logbook não existe" });

      let total_value;

      if (discount || discount > 0)
      total_value =
        logbook.cost_per_item - (logbook.cost_per_item * discount) / 100;
      else total_value = logbook.cost_per_item * quantity;

      total_value.toFixed(2);

      const itemSale = await ItemSale.create({
        cost_per_item: product.cost_per_item,
        quantity,
        sale_id,
        total_value,
        product_id,
        logbook_inventory_id: logbook.id,
      });

      res.status(201).send(itemSale);
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
