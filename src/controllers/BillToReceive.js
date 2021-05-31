const Branch = require("../models/Branch");
const BillToReceive = require("../models/BillToReceive");

module.exports = {
  async index(req, res) {
    try {
      const { branch_id } = req.params;

      const branch = await Branch.findByPk(branch_id);

      const sales = await branch.getSales();

      let bills = [];

      await Promise.all(
        sales.map(async (sale) => {
          const bill = await sale.getBillToReceive();
          bills.push(bill);
        })
      );

      res.send(bills);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async find(req, res) {
    try {
      const { id } = req.params;

      const bill = await BillToReceive.findByPk(id);

      res.status(201).send(bill);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;

      const bill = await BillToReceive.findByPk(id);

      if (!bill)
        return res.status(404).send({ erro: "conta a receber não existe" });

      const { received } = req.body;

      if (received) bill.received = received;

      await bill.save();
      res.send(bill);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
