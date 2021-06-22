const Lot = require("../models/Lot");

module.exports = {
  async index(req, res) {
    try {
      const { logbook_id } = req.params;

      let lots;

      if (logbook_id)
        lots = await Lot.findOne({
          attributes: [
            "id",
            "lot_number",
            "manufacture_date",
            "expiration_date",
          ],
          include: {
            association: "logbook_inventories",
            where: {
              id: logbook_id,
            },
          },
        });
      else
        lots = await Lot.findAll({
          attributes: [
            "id",
            "lot_number",
            "manufacture_date",
            "expiration_date",
          ],
          include: {
            association: "logbook_inventories",
          },
        });

      res.send(lots);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async find(req, res) {
    try {
      const { id } = req.params;

      const lot = await Lot.findByPk(id, {
        attributes: ["id", "lot_number", "manufacture_date", "expiration_date"],
      });

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

      if (!lot) return res.send({ error: "Lot requesitado não existe" });

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
