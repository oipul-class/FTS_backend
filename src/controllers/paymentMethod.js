const PaymentMethod = require("../models/PaymentMethod");
const { find } = require("./purchase");

module.exports = {
  async index(req, res) {
    try {
      const paymentMethods = await PaymentMethod.findAll();

      res.send(paymentMethods);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async find(req, res) {
    try {

      const { id } = req.params;

      const paymentMethod = await PaymentMethod.findByPk(id);

      res.send(paymentMethod);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
