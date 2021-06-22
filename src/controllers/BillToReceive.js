const Branch = require("../models/Branch");
const BillToReceive = require("../models/BillToReceive");

module.exports = {
  async index(req, res) {
    try {
      const { branch_id } = req.params;

      const branch = await Branch.findByPk(branch_id);

      if (!branch)
        return res.status(404).send({ error: "Filial requesitada não existe" });

      const sales = await branch.getSales();

      if (!sales)
        return res.status(400).send({ error: "Não foi feito vendas nessa filial" });

      let bills = [];

      await Promise.all(
        sales.map(async (sale) => {
          const bill = await sale.getBillToReceive();
          if (bill) {
            bills.push(bill);
          }
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

      if (!bill)
        return res.status(404).send({ error: "Conta a receber requesitada não existe" });

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
        return res.status(404).send({ error: "Conta a receber requesitada não existe" });

      const { received } = req.body;

      if (received !== undefined) bill.received = received;

      await bill.save();
      res.send(bill);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
