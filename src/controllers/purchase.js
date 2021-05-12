const Purchase = require("../models/Purchase");
const ItemPurchase = require("../models/ItemPurchase");

module.exports = {
  async index(req, res) {
    try {
      const purchases = await Purchase.findAll();

      res.send(purchases);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async find(req, res) {
    try {
      const { id } = req.params;

      const purchase = await Purchase.findByPk(id);

      res.send(purchase);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async store(req, res) {
    try {
      const { payment_method_id, logbook_invetory_id } = req.body;

      const purchase = await Purchase.create({
        payment_method_id,
        logbook_invetory_id,
      });

      res.status(404).send(purchase);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { payment_method_id } = req.body;

      const purchase = await Purchase.findByPk(id);

      if (!purchase)
        return res.status(404).send({ erro: "compra não encontrada" });

      if (payment_method_id) purchase.payment_method_id = payment_method_id;

      await purchase.save();

      res.send(purchase);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;

      const purchase = await Purchase.findByPk(id);

      if (!purchase)
        return res.status(404).send({ erro: "compra não encontrada" });

      await purchase.destroy();

      const itemPurchases = await ItemPurchase.findAll({
        where: {
          purchase_id: purchase.id
        },
      });

      itemPurchases.map( async (item) => {
        await item.destroy();
      });
      
      res.send();
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
