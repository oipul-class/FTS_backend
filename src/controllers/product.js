const Product = require("../models/Product");
const UnitOfMeasurement = require("../models/UnitOfMeasurement");
const ProductType = require("../models/ProductType");
const Company = require("../models/Company");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const auth = require("../config/auth");
const LogBookInventory = require("../models/LogBookInventory");
const Lot = require("../models/Lot");

module.exports = {
  async index(req, res) {
    try {
      const { company_id, bar_code } = req.params;
      let { product_name, product_type } = req.query;

      if (product_name)
        product_name = product_name.replace('"', "").replace('"', "");

      if (product_type)
        product_type = product_type.replace('"', "").replace('"', "");

      console.log("names:", product_name);

      let products;

      if (company_id) {
        if (!bar_code && !product_type && !product_name)
          products = await Product.findAll({
            where: {
              company_id,
            },
            attributes: [
              "id",
              "product_name",
              "description",
              "bar_code",
              "cost_per_item",
              "image_url",
              "unit_of_measurement_id",
              "product_type_id",
              "company_id",
              "created_at",
            ],
            include: [
              {
                model: ProductType,
                attributes: ["type"],
              },
              {
                model: LogBookInventory,
                attributes: ["id", "date_of_acquisition", "quantity_acquired"],
                include: {
                  model: Lot,
                  attributes: [
                    "id",
                    "lot_number",
                    "manufacture_date",
                    "expiration_date",
                  ],
                },
              },
            ],
          });
        else if (bar_code)
          products = await Product.findOne({
            where: {
              company_id,
              bar_code: bar_code,
            },
            attributes: [
              "id",
              "product_name",
              "description",
              "bar_code",
              "cost_per_item",
              "image_url",
              "unit_of_measurement_id",
              "product_type_id",
              "company_id",
              "created_at",
            ],
            include: [
              {
                model: ProductType,
                attributes: ["type"],
              },
              {
                model: LogBookInventory,
                attributes: ["id", "date_of_acquisition", "quantity_acquired"],
                include: {
                  model: Lot,
                  attributes: [
                    "id",
                    "lot_number",
                    "manufacture_date",
                    "expiration_date",
                  ],
                },
              },
            ],
          });
        else if (product_name || product_type)
          products = await Product.findAll({
            where: {
              company_id,
              product_name: {
                [Op.substring]: product_name ? product_name : "",
              },
            },
            attributes: [
              "id",
              "product_name",
              "description",
              "bar_code",
              "cost_per_item",
              "image_url",
              "unit_of_measurement_id",
              "product_type_id",
              "company_id",
              "created_at",
            ],
            include: [
              {
                model: ProductType,
                required: product_type ? true : false,
                where: {
                  type: { [Op.substring]: product_type ? product_type : "" },
                },
                attributes: ["type"],
              },
              {
                model: LogBookInventory,
                attributes: ["id", "date_of_acquisition", "quantity_acquired"],
                include: {
                  model: Lot,
                  attributes: [
                    "id",
                    "lot_number",
                    "manufacture_date",
                    "expiration_date",
                  ],
                },
              },
            ],
          });
      } else
        products = await Product.findAll({
          attributes: [
            "id",
            "product_name",
            "description",
            "bar_code",
            "cost_per_item",
            "unit_of_measurement_id",
            "product_type_id",
            "company_id",
            "created_at",
          ],
          include: [
            {
              model: ProductType,
              attributes: ["type"],
            },
            {
              model: LogBookInventory,
              attributes: ["id", "date_of_acquisition", "quantity_acquired"],
              include: {
                model: Lot,
                attributes: [
                  "id",
                  "lot_number",
                  "manufacture_date",
                  "expiration_date",
                ],
              },
            },
          ],
        });

      res.send(products);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async find(req, res) {
    try {
      const { id } = req.params;

      const product = await Product.findByPk(id, {
        attributes: [
          "id",
          "product_name",
          "description",
          "bar_code",
          "cost_per_item",
          "unit_of_measurement_id",
          "product_type_id",
          "company_id",
          "created_at",
        ],
        include: [
          {
            model: ProductType,
            attributes: ["type"],
          },
          {
            model: LogBookInventory,
            attributes: ["id", "date_of_acquisition", "quantity_acquired"],
            include: {
              model: Lot,
              attributes: [
                "id",
                "lot_number",
                "manufacture_date",
                "expiration_date",
              ],
            },
          },
        ],
      });

      res.send(product);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async store(req, res) {
    try {
      const {
        product_name,
        description,
        bar_code,
        cost_per_item,
        product_url,
        unit_of_measurement_id,
        product_type_id,
        company_id,
      } = req.body;

      const unit_of_measurement = await UnitOfMeasurement.findByPk(
        unit_of_measurement_id
      );
      const product_type = await ProductType.findByPk(product_type_id);

      if (!unit_of_measurement || !product_type)
        return res.status(404).send({
          error:
            "Unidade de medidade ou tipo do produto requisitado não existe",
        });

      const company = await Company.findByPk(parseInt(company_id));

      if (!company)
        return res
          .status(404)
          .send({ error: "Comapnhia requesitada não existe" });

      const image_url = product_url ? product_url : null;

      const product = await Product.create({
        product_name,
        description,
        bar_code,
        cost_per_item,
        image_url,
        unit_of_measurement_id,
        product_type_id,
        company_id,
      });

      res.status(201).send(product);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;

      const {
        product_name,
        description,
        bar_code,
        cost_per_item,
        product_url,
        unit_of_measurement_id,
        product_type_id,
      } = req.body;

      const product = await Product.findByPk(id);

      if (!product)
        return res
          .status(404)
          .send({ error: "Produto requesitado não existe" });

      if (product_name) product.product_name = product_name;
      if (description) product.description = description;
      if (bar_code) product.bar_code = bar_code;
      if (cost_per_item) product.cost_per_item = cost_per_item;
      if (product_url) product.image_url = product_url;
      if (unit_of_measurement_id) {
        const unit_of_measurement = await UnitOfMeasurement.findByPk(
          unit_of_measurement_id
        );

        if (!unit_of_measurement)
          return res
            .status(404)
            .send({ error: "Unidade de medida requesitada não existe" });

        product.unit_of_measurement_id = unit_of_measurement_id;
      }

      if (product_type_id) {
        const product_type = await UnitOfMeasurement.findByPk(product_type_id);

        if (!product_type)
          return res
            .status(404)
            .send({ error: "Tipo de produto requesitado não existe" });

        product.product_type_id = product_type_id;
      }

      await product.save();
      res.send(product);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;

      const product = await Product.findByPk(id);

      if (!product)
        return res
          .status(404)
          .send({ error: "Produto requesitado não existe" });

      await product.destroy();

      const logbooks = await LogBookInventory.findAll({
        where: {
          product_id: id,
        },
      });

      await Promise.all(
        logbooks.map(async (logbook) => {
          await logbook.destroy();
        })
      );

      res.send();
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
