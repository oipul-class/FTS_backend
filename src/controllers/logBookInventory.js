const Branch = require("../models/Branch");
const LogBookInventory = require("../models/LogBookInventory");
const Lot = require("../models/Lot");
const Product = require("../models/Product");
const UnitOfMeasurement = require("../models/UnitOfMeasurement");
const ProductType = require("../models/ProductType");

module.exports = {
  async index(req, res) {
    try {
      const { branch_id, company_id } = req.params;

      let logbooks;

      if (branch_id)
        logbooks = await LogBookInventory.findAll({
          attributes: ["id", "date_of_acquisition", "quantity_acquired"],
          where: {
            branch_id,
          },
          include: [
            {
              model: Product,
              attributes: [
                "id",
                "product_name",
                "description",
                "bar_code",
                "cost_per_item",
              ],
              include: [
                {
                  model: UnitOfMeasurement,
                  attributes: ["id", "unit_name"],
                },
                {
                  model: ProductType,
                  attributes: ["id", "type"],
                },
              ],
            },
            {
              model: Lot,
              attributes: [
                "id",
                "lot_number",
                "manufacture_date",
                "expiration_date",
              ],
            },
          ],
        });
      else if (company_id)
        logbooks = await LogBookInventory.findAll({
          attributes: ["id", "date_of_acquisition", "quantity_acquired"],
          include: [
            {
              model: Product,
              required: true,
              where: {
                company_id,
              },
              attributes: [
                "id",
                "product_name",
                "description",
                "bar_code",
                "cost_per_item",
              ],
              include: [
                {
                  model: UnitOfMeasurement,
                  attributes: ["id", "unit_name"],
                },
                {
                  model: ProductType,
                  attributes: ["id", "type"],
                },
              ],
            },
            {
              model: Lot,
              attributes: [
                "id",
                "lot_number",
                "manufacture_date",
                "expiration_date",
              ],
            },
          ],
        });
      else
        logbooks = await LogBookInventory.findAll({
          attributes: ["id", "date_of_acquisition", "quantity_acquired"],
          include: [
            {
              model: Product,
              attributes: [
                "id",
                "product_name",
                "description",
                "bar_code",
                "cost_per_item",
              ],
              include: [
                {
                  model: UnitOfMeasurement,
                  attributes: ["id", "unit_name"],
                },
                {
                  model: ProductType,
                  attributes: ["id", "type"],
                },
              ],
            },
            {
              model: Lot,
              attributes: [
                "id",
                "lot_number",
                "manufacture_date",
                "expiration_date",
              ],
            },
          ],
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
        attributes: ["id", "date_of_acquisition", "quantity_acquired"],
        include: [
          {
            model: Product,
            attributes: [
              "id",
              "product_name",
              "description",
              "bar_code",
              "cost_per_item",
            ],
            include: [
              {
                model: UnitOfMeasurement,
                attributes: ["id", "unit_name"],
              },
              {
                model: ProductType,
                attributes: ["id", "type"],
              },
            ],
          },
          {
            model: Lot,
            attributes: [
              "id",
              "lot_number",
              "manufacture_date",
              "expiration_date",
            ],
          },
        ],
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

      const product = await Product.findByPk(product_id);

      const branch = await Branch.findByPk(branch_id);

      if (!product || !branch)
        return res
          .status(404)
          .send({ error: "Produto ou filial requisitada não existe" });

      const existingLogbook = await LogBookInventory.findOne({
        where: {
          product_id,
          branch_id,
        },
      });

      if (existingLogbook)
        return res.status(400).send({
          error: "Já existe o produto requesitado no inventario da filial",
        });

      const logbook = await LogBookInventory.create({
        date_of_acquisition,
        quantity_acquired,
        branch_id,
        product_id,
        lot_id: lotInfo.id,
      });

      res.status(201).send(logbook);
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
        return res
          .status(404)
          .send({ error: "Logbook requisitado não existe" });

      if (date_of_acquisition)
        logbook.date_of_acquisition = date_of_acquisition;
      if (cost_per_item) logbook.cost_per_item = cost_per_item;
      if (quantity_acquired) logbook.quantity_acquired = quantity_acquired;
      if (product_id) {
        const product = await Product.findByPk(product_id);

        if (!product)
          return res
            .status(404)
            .send({ error: "Produto requisitado não existe" });

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
