const Lot = require("../models/Lot");

module.exports = {
  async index(req, res) {
    try {
      const lots = await Lot.findAll();

      res.send(lots);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async find(req, res) {
    try {
      const { id } = req.params;

      const lot = await Lot.findByPk(id);

      res.send(lot);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;

      const { lot_number, manufacture_date, expiration_date } = req.body;

      const lot = await Lot.findByPk(id);

      if (!lot) return res.send({ erro: "Lot não existe" });

      if (lot_number) lot.lot_number = lot_number;
      if (manufacture_date) lot.manufacture_date = manufacture_date;
      if (expiration_date) lot.expiration_date = expiration_date;

      await lot.save;

      res.send(lot);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};