const PaymentMethod = require("../models/PaymentMethod");
const { Op } = require("sequelize");

module.exports = {
  async index(req, res) {
    try {
      const { method } = req.body;

      let paymentMethods;

      if (method)
        paymentMethods = await PaymentMethod.findAll({
          where: {
            method: {
              [Op.substring]: method,
            },
          },
        });
      else paymentMethods = await PaymentMethod.findAll();

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
