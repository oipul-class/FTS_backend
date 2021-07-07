const ItemSale = require("../models/ItemSale");
const Sale = require("../models/Sale");
const Costumer = require("../models/Costumer");
const LogBookInventory = require("../models/LogBookInventory");
const Product = require("../models/Product");

module.exports = {
  async index(req, res) {
    try {
      const { sale_id } = req.params;

      let itemSale;

      if (sale_id)
        itemSale = await ItemSale.findAll({
          where: {
            sale_id,
          },
          attributes: ["id", "cost_per_item", "quantity"],
          include: [
            {
              model: LogBookInventory,
              attributes: ["id", "date_of_acquisition", "quantity_acquired"],
              include: {
                model: Product,
                attributes: [
                  "id",
                  "product_name",
                  "description",
                  "bar_code",
                  "cost_per_item",
                ],
              },
            },

            {
              model: Sale,
              attributes: ["id"],
              include: {
                model: Costumer,
                attributes: ["costumer_name", "cpf"],
              },
            },
          ],
        });
      else
        itemSale = await ItemSale.findAll({
          attributes: ["id", "cost_per_item", "quantity"],
          include: [
            {
              model: LogBookInventory,
              attributes: ["id", "date_of_acquisition", "quantity_acquired"],
              include: {
                model: Product,
                attributes: [
                  "id",
                  "product_name",
                  "description",
                  "bar_code",
                  "cost_per_item",
                ],
              },
            },

            {
              model: Sale,
              attributes: ["id"],
              include: {
                model: Costumer,
                attributes: ["costumer_name", "cpf"],
              },
            },
          ],
        });

      res.send(itemSale);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async find(req, res) {
    try {
      const { id } = req.params;

      const itemSale = await ItemSale.findByPk(id, {
        attributes: [
          "id",
          "cost_per_item",
          "quantity",
        ],
        include: [
          {
            model: LogBookInventory,
            attributes: ["id", "date_of_acquisition", "quantity_acquired"],
            include: {
              model: Product,
              attributes: [
                "id",
                "product_name",
                "description",
                "bar_code",
                "cost_per_item",
              ],
            },
          },

          {
            model: Sale,
            attributes: ["id"],
            include: {
              model: Costumer,
              attributes: ["costumer_name", "cpf"],
            },
          },
        ],
      });

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

      if (!product)
        return res
          .status(404)
          .send({ error: "Produto requesitado não existe" });

      const logbook = await product.getLogBookInventory();

      if (!logbook)
        return res
          .status(404)
          .send({ error: "Logbook requesitado não existe" });

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
          .send({ error: "Item no carrinho de venda requesitado não existe" });

      await itemSale.destroy();

      res.send();
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
