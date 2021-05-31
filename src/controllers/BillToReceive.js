const BillToReceive = require("../models/BillToReceive");
const Branch = require("../models/Branch");
const ItemSale = require("../models/ItemSale");
const LogBookInventory = require("../models/LogBookInventory");
const Sale = require("../models/Sale");

module.exports = {
  async index(req, res) {
    try {
      const { branch_id } = req.params;

      const bills = BillToReceive.findAll({
        include: {
          model: Sale,
          include: {
            model: ItemSale,
            include: {
              model: LogBookInventory,
              include: {
                model: Branch,
                where: {
                  id: branch_id,
                },
              },
            },
          },
        },
      });

      res.send(bills);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
