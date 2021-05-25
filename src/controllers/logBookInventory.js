const LogBookInventory = require("../models/LogBookInventory");
const Lot = require("../models/Lot");
const Product = require("../models/Product");

module.exports = {
  async index(req, res) {
    try {
      const { id } = body.params;

      let logbooks;

      if (!id)
        logbooks = await LogBookInventory.findAll({
          include: Lot,
        });
      else
        logbooks = await LogBookInventory.findAll({
          where: {
            branch_id: id,
          },
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

      await logbook.save();

      res.send(logbook);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
