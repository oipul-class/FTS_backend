const Purchase = require("../models/Purchase");
const PaymentMethod = require("../models/PaymentMethod");
const ItemPurchase = require("../models/ItemPurchase");
const Branch = require("../models/Branch");
const Product = require("../models/Product");
const Address = require("../models/Address");

module.exports = {
  async index(req, res) {
    try {
      const { branch_id, company_id } = req.params;
      let purchases;

      if (branch_id)
        purchases = await Purchase.findAll({
          attributes: ["id"],
          where: {
            branch_id,
          },
          include: [
            {
              model: ItemPurchase,
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
              attributes: ["id", "branch_name", "branch_email", "place_number"],
              include: {
                model: Address,
                attributes: [
                  "id",
                  "cep",
                  "street",
                  "complement",
                  "district",
                  "city",
                  "uf",
                ],
              },
            },
          ],
        });
      else if (company_id)
        purchases = await Purchase.findAll({
          attributes: ["id"],
          include: [
            {
              model: ItemPurchase,
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
              required: true,
              where: {
                company_id,
              },
              attributes: ["id", "branch_name", "branch_email", "place_number"],
              include: {
                model: Address,
                attributes: [
                  "id",
                  "cep",
                  "street",
                  "complement",
                  "district",
                  "city",
                  "uf",
                ],
              },
            },
          ],
        });
      else
        purchases = await Purchase.findAll({
          attributes: ["id"],
          include: [
            {
              model: ItemPurchase,
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
              attributes: ["id", "branch_name", "branch_email", "place_number"],
              include: {
                model: Address,
                attributes: [
                  "id",
                  "cep",
                  "street",
                  "complement",
                  "district",
                  "city",
                  "uf",
                ],
              },
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
        attributes: ["id"],
        include: [
          {
            model: ItemPurchase,
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
            attributes: ["id", "branch_name", "branch_email", "place_number"],
            include: {
              model: Address,
              attributes: [
                "id",
                "cep",
                "street",
                "complement",
                "district",
                "city",
                "uf",
              ],
            },
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
        return res
          .status(404)
          .send({ error: "Metodo de pagamento requesitado não existe" });

      const branch = await Branch.findByPk(branch_id);

      if (!branch)
        return res.status(404).send({ error: "Filial requesitada não existe" });

      const purchase = await branch.createPurchase({
        payment_method_id,
      });

      if (items) {
        items.map(async (item) => {
          if (item.product_id) {
            const product = await Product.findByPk(item.product_id);
            const logbook = await product.getLogBookInventory();

            let total_value;

            if (item.discount || item.discount > 0)
              total_value =
                product.cost_per_item -
                (product.cost_per_item * item.discount) / 100;
            else total_value = product.cost_per_item * item.quantity;

            total_value.toFixed(2);

            await purchase.createItemPurchase({
              cost_per_item: product.cost_per_item,
              quantity: item.quantity,
              discount: item.discount,
              total_value,
              product_id: item.product_id,
              logbook_inventory_id: logbook.id,
            });
          }
        });
      }

      res.status(201).send(purchase);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { payment_method_id } = req.body;

      const purchase = await Purchase.findByPk(id, {
        attributes: ["id"],
        include: [
          {
            model: ItemPurchase,
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
            attributes: ["id", "branch_name", "branch_email", "place_number"],
            include: {
              model: Address,
              attributes: [
                "id",
                "cep",
                "street",
                "complement",
                "district",
                "city",
                "uf",
              ],
            },
          },
        ],
      });

      if (!purchase)
        return res
          .status(404)
          .send({ error: "Compra requesitada não encontrada" });

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
        return res
          .status(404)
          .send({ error: "Compra requesitada não encontrada" });

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
