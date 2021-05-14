const Sale = require("../models/Sale");
const Costumer = require("../models/Costumer");
const PaymentMethod = require("../models/PaymentMethod");
const ItemSale = require("../models/ItemSale");

module.exports = {
  async index(req, res) {
    try {
      const sales = await Sale.findAll();

      res.send(sales);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async find(req, res) {
    try {
      const { id } = req.params;

      const sale = await Sale.findByPk(id);

      res.send(sale);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async store(req, res) {
    try {
      const { payment_method_id, costumer_id } = req.body;

      const paymentMethod = await PaymentMethod.findByPk(payment_method_id);

      if (!paymentMethod)
        return res.status(404).send({ erro: "metodo de pagamento não existe" });

      const sale = await Sale.create({
        payment_method_id,
        costumer_id,
      });

      res.status(404).send(sale);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { payment_method_id, costumer_id } = req.body;

      const sale = await Sale.findByPk(id);

      if (!sale) return res.status(404).send({ erro: "compra não encontrada" });

      if (payment_method_id) sale.payment_method_id = payment_method_id;
      if (costumer_id) {
        const costumer = await Costumer.findByPk(costumer_id);

        if (!costumer)
          return res.status(404).send({ erro: "cliente não existe" });

        sale.costumer_id = costumer_id;
      }
      await sale.save();

      res.send(sale);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;

      const sale = await Sale.findByPk(id);

      if (!sale) return res.status(404).send({ erro: "venda não encontrada" });

      await sale.destroy();

      const itemSales = await ItemSale.findAll({
        where: {
          sale_id: sale.id,
        },
      });

      itemSales.map(async (item) => {
        item.destroy();
      });

      res.send();
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
