const Branch = require("../models/Branch");
const BillToPay = require("../models/BillToPay");

module.exports = {
  async index(req, res) {
    try {
      const { branch_id } = req.params;

      const branch = await Branch.findByPk(branch_id);

      if (!branch)
        return res.status(404).send({ error: "Filial requesitada não existe" });

      const purchases = await branch.getPurchases();

      if (!purchases)
        return res
          .status(400)
          .send({ error: "Não foi feita compras para o estoque nessa filial" });

      let bills = [];

      await Promise.all(
        purchases.map(async (purchase) => {
          const bill = await purchase.getBillToPay();
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

      const bill = await BillToPay.findByPk(id);

      if (!bill)
        return res.status(404).send({ error: "Conta a pagar requesitada não existe" });

      res.send(bill);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;

      const bill = await BillToPay.findByPk(id);

      if (!bill)
        return res.status(404).send({ error: "Conta a pagar requesitada não existe" });

      const { paid } = req.body;

      if (paid !== undefined) bill.paid = paid;

      await bill.save();
      res.send(bill);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
