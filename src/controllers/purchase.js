const Purchase = require("../models/Purchase");
const PaymentMethod = require("../models/PaymentMethod");
const ItemPurchase = require("../models/ItemPurchase");
const Branch = require("../models/Branch");
const Product = require("../models/Product");

module.exports = {
  async index(req, res) {
    try {
      const purchases = await Purchase.findAll({
        include: [
          {
            model: ItemPurchase,
          },
        ],
      });

      res.send(purchases);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async find(req, res) {
    try {
      const { id } = req.params;

      const purchase = await Purchase.findByPk(id, {
        include: [
          {
            model: ItemPurchase,
          },
        ],
      });

      res.send(purchase);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async store(req, res) {
    try {
      const { payment_method_id, branch_id } = req.body;
      const items = req.body.items;
      const paymentMethod = await PaymentMethod.findByPk(payment_method_id);

      if (!paymentMethod)
        return res.status(404).send({ erro: "metodo de pagamento não existe" });

      const branch = await Branch.findByPk(branch_id);

      if (!branch) return res.status(404).send({ erro: "filial não existe" });

      const purchase = await branch.createPurchase({
        payment_method_id,
      });

      if (items) {
        items.map(async (item) => {
          const product = await Product.findByPk(item.product_id);
          const logbook = await product.getLogBookInventory();

          let total_value;

          if (item.discount || item.discount > 0)
            total_value =
              product.cost_per_item -
              (product.cost_per_item * item.discount) / 100;
          else total_value = product.cost_per_item * item.quantity;
          await purchase.createItemPurchase({
            cost_per_item: product.cost_per_item,
            quantity: item.quantity,
            discount: item.discount,
            total_value,
            product_id: item.product_id,
            logbook_inventory_id: logbook.id,
          });
        });
      }
      
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

      const itemPurchases = await purchase.getItemPurchases();

      itemPurchases.map(async (item) => {
        await item.destroy();
      });

      res.send();
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
