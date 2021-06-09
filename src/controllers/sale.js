const Sale = require("../models/Sale");
const Costumer = require("../models/Costumer");
const PaymentMethod = require("../models/PaymentMethod");
const ItemSale = require("../models/ItemSale");
const Branch = require("../models/Branch");
const Product = require("../models/Product");

module.exports = {
  async index(req, res) {
    try {
      const { branch_id } = req.params;

      let sales;

      if (branch_id)
        sales = await Sale.findAll({
          attributes: ["id"],
          where: {
            branch_id,
          },
          include: [
            {
              model: ItemSale,
              attributes: [
                "id",
                "cost_per_item",
                "quantity",
                "total_value",
                "discount",
              ],
            },
            {
              model: Branch,
              attributes: [
                "id",
                "branch_name",
                "cep",
                "branch_email",
                "place_number",
              ],
            },
            {
              model: Costumer,
              attributes: ["id", "costumer_name", "cpf"],
            },
          ],
        });
      else
        sales = await Sale.findAll({
          attributes: ["id"],
          include: [
            {
              model: ItemSale,
              attributes: [
                "id",
                "cost_per_item",
                "quantity",
                "total_value",
                "discount",
              ],
            },
            {
              model: Branch,
              attributes: [
                "id",
                "branch_name",
                "cep",
                "branch_email",
                "place_number",
              ],
            },
            {
              model: Costumer,
              attributes: ["id", "costumer_name", "cpf"],
            },
          ],
        });

      res.send(sales);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async find(req, res) {
    try {
      const { id } = req.params;

      const sale = await Sale.findByPk(id, {
        attributes: ["id"],
        include: [
          {
            model: ItemSale,
            attributes: [
              "id",
              "cost_per_item",
              "quantity",
              "total_value",
              "discount",
            ],
          },
          {
            model: Branch,
            attributes: [
              "id",
              "branch_name",
              "cep",
              "branch_email",
              "place_number",
            ],
          },
          {
            model: Costumer,
            attributes: ["id", "costumer_name", "cpf"],
          },
        ],
      });

      res.send(sale);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async store(req, res) {
    try {
      const { payment_method_id, costumer_id, branch_id } = req.body;
      const items = req.body.items;

      const paymentMethod = await PaymentMethod.findByPk(payment_method_id);

      if (!paymentMethod)
        return res
          .status(404)
          .send({ erro: "Metodo de pagamento requesitado não existe" });

      const branch = await Branch.findByPk(branch_id);

      if (!branch)
        return res.status(404).send({ erro: "Filial requesitada não existe" });

      const sale = await branch.createSale({
        payment_method_id,
        costumer_id,
      });

      if (items) {
        items.map(async (item) => {
          try {
            const product = await Product.findByPk(item.product_id);
            const logbook = await product.getLogBookInventory();

            let total_value;

            if (item.discount || item.discount > 0)
              total_value =
                product.cost_per_item -
                (product.cost_per_item * item.discount) / 100;
            else total_value = product.cost_per_item * item.quantity;

            total_value = total_value.toFixed(2);

            await sale.createItemSale({
              cost_per_item: product.cost_per_item,
              quantity: item.quantity,
              discount: item.discount,
              total_value,
              product_id: item.product_id,
              logbook_inventory_id: logbook.id,
            });
          } catch (error) {
            console.error(error);
            return res.status(500).send(error);
          }
        });
      }

      res.status(201).send(sale);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { payment_method_id, costumer_id } = req.body;

      const sale = await Sale.findByPk(id, {
        attributes: ["id"],
        include: [
          {
            model: ItemSale,
            attributes: [
              "id",
              "cost_per_item",
              "quantity",
              "total_value",
              "discount",
            ],
          },
          {
            model: Branch,
            attributes: [
              "id",
              "branch_name",
              "cep",
              "branch_email",
              "place_number",
            ],
          },
          {
            model: Costumer,
            attributes: ["id", "costumer_name", "cpf"],
          },
        ],
      });

      if (!sale)
        return res
          .status(404)
          .send({ erro: "Venda requisitada não encontrada" });

      if (payment_method_id) sale.payment_method_id = payment_method_id;
      if (costumer_id) {
        const costumer = await Costumer.findByPk(costumer_id);

        if (!costumer)
          return res
            .status(404)
            .send({ erro: "Cliente requisitado não existe" });

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

      if (!sale)
        return res
          .status(404)
          .send({ erro: "Venda requesitada não encontrada" });

      await sale.destroy();

      const itemSales = await sale.getItemSales();

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
