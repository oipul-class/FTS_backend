const LogBookInventoryl = require("../models/LogBookInventory");
const Product = require("../models/Product");
const UnitOfMeasurement = require("../models/UnitOfMeasurement");
module.exports = {
  index: async (req, res) => {
    try {
      const { branch_id } = req.params;

      if (!branch_id || branch_id <= 0)
        return res
          .status(400)
          .send({ error: "Não foi enviado a filial para a listagem" });

      let reports = [];

      const itemInventorys = await LogBookInventoryl.findAll({
        attributes: ["id", "quantity_acquired", "created_at"],
        where: {
          branch_id,
        },
        include: {
          model: Product,
          attributes: [
            "product_name",
            "description",
            "bar_code",
            "cost_per_item",
           "created_at"
          ],
          include: {
            model: UnitOfMeasurement,
            attributes: ["unit_name"],
          },
        },
      });

      await Promise.all(
        (itemInventorys.map(async (item) => {
          const report = {
            id: item.id,
            bar_code: item.Product.bar_code,
            product_name: item.Product.product_name,
            description: item.Product.description,
            quantity: item.quantity_acquired,
            cost_per_item: item.Product.cost_per_item,
            unit_name: item.Product.UnitOfMeasurement.unit_name,
          };
          reports.push(report)
        }))
      );

      res.send(reports);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
