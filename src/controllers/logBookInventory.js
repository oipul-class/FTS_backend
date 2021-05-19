const LogBookInventory = require("../models/LogBookInventory");
const Lot = require("../models/Lot");
const Product = require("../models/Product");
const Costumer = require("../models/Costumer");

module.exports = {
  async index(req, res) {
    try {
      const logbooks = await LogBookInventory.findAll({
        include: Lot,
      });

      res.send(logbooks);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async find(req, res) {
    try {
      const { id } = req.params;

      const logbook = await LogBookInventory.findByPk(id, {
        include: {
          model: Lot,
        },
      });

      res.send(logbook);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async store(req, res) {
    try {
      const {
        date_of_acquisition,
        quantity_acquired,
        branch_id,
        product_id,
        costumer_id,
        lot,
      } = req.body;

      const lotInfo = await Lot.create(lot);

      const total_value = cost_per_item * quantity_acquired;

      const logbook = await LogBookInventory.create({
        date_of_acquisition,
        cost_per_item,
        quantity_acquired,
        total_value,
        branch_id,
        product_id,
        costumer_id,
        lot_id: lotInfo.id,
      });

      res.status(404).send(logbook);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;

      const {
        date_of_acquisition,
        cost_per_item,
        quantity_acquired,
        product_id,
        costumer_id,
      } = req.body;

      const logbook = await LogBookInventory.findByPk(id);

      if (!logbook)
        return res.status(404).send({ erro: "log book não existe" });

      if (date_of_acquisition)
        logbook.date_of_acquisition = date_of_acquisition;
      if (cost_per_item) logbook.cost_per_item = cost_per_item;
      if (quantity_acquired) logbook.quantity_acquired = quantity_acquired;
      if (product_id) {
        const product = await Product.findByPk(product_id);

        if (!product)
          return res.status(404).send({ erro: "produto não existe" });

        logbook.product_id = product_id;
      }
      if (costumer_id) {
        const costumer = await Costumer.findByPk(costumer_id);

        if (!costumer)
          return res.status(404).send({ erro: "cliente não existe" });

        logbook.costumer_id = costumer_id;
      }
      await logbook.save();

      res.send(logbook);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
