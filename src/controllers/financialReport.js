const { Op } = require("sequelize");
const ItemPurchase = require("../models/ItemPurchase");
const Purchase = require("../models/Purchase");
const Sale = require("../models/Sale");

module.exports = {
  async index(req, res) {
    try {
      const { branch_id } = req.params;
      let { start_date, end_date } = req.query;

      const date = new Date();
      const first_day = new Date(date.getFullYear(), date.getMonth(), 1);
      const last_day = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      if (start_date) start_date = start_date.replace('"', "").replace('"', "");
      else start_date = first_day;

      if (end_date) end_date = end_date.replace('"', "").replace('"', "");
      else end_date = last_day;

      let salesTotalValue = 0.0;
      let purchasesTotalValue = 0.0;
      let totalBalance = 0.0;

      let sales;
      let purchases;

      if (start_date && end_date) {
        sales = await Sale.findAndCountAll({
          where: {
            branch_id,
            created_at: { [Op.between]: [start_date, end_date] },
          },
          attributes: ["id", "total_value", "discount"],
        });

        purchases = await Purchase.findAndCountAll({
          where: {
            branch_id,
            created_at: { [Op.between]: [start_date, end_date] },
          },
          attributes: ["id"],
          include: {
            model: ItemPurchase,
            attributes: ["total_value"],
          },
        });
      } else {
        sales = await Sale.findAndCountAll({
          where: {
            branch_id,
          },
          attributes: ["id", "total_value", "discount"],
        });

        purchases = await Purchase.findAndCountAll({
          where: {
            branch_id,
          },
          attributes: ["id"],
          include: {
            model: ItemPurchase,
            attributes: ["total_value"],
          },
        });
      }

      sales.rows.map((sale) => {
        salesTotalValue = salesTotalValue + parseFloat(sale.total_value);
        totalBalance = totalBalance + parseFloat(sale.total_value);
      });

      await Promise.all(
        purchases.rows.map((purchase) => {
          purchase.ItemPurchases.map((item) => {
            purchasesTotalValue =
              purchasesTotalValue + parseFloat(item.total_value);
            totalBalance = totalBalance - parseFloat(item.total_value);
          });
        })
      );

      res.send({
        sales_total_value: salesTotalValue,
        purchases_total_value: purchasesTotalValue,
        total_balance: totalBalance,
        sale_amount: sales.count,
        purchase_amount: purchases.count,
        sales: sales.rows,
        purchase: purchases.rows,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
