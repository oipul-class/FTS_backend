const Product = require("../models/Product");
const UnitOfMeasurement = require("../models/UnitOfMeasurement");
const ProductType = require("../models/ProductType");
const Company = require("../models/Company");

module.exports = {
  async index(req, res) {
    try {
      const products = await Product.findAll();

      res.send(products);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async find(req, res) {
    try {
      const { id } = req.params;

      const product = await Product.findByPk(id);

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
        total_quantity,
        cost_per_item,
        unit_of_measurement_id,
        product_type_id,
        company_id,
      } = req.body;

      const unit_of_measurement = await UnitOfMeasurement.findByPk(
        unit_of_measurement_id
      );
      const product_type = await ProductType.findByPk(product_type_id);

      if (!unit_of_measurement || !product_type)
        return res
          .status(404)
          .send({ erro: "unidade de medida ou tipo de produto não existe" });

      const company = await Company.findByPk(company_id);

      if (!company)
        return res.status(404).send({ erro: "compania não existe" });

      const product = await Product.create({
        product_name,
        total_quantity,
        cost_per_item,
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
        total_quantity,
        cost_per_item,
        unit_of_measurement_id,
        product_type_id,
      } = req.body;

      const product = await Product.findByPk(id);

      if (!product) return res.status(404).send({ erro: "produto não existe" });

      if (product_name) product.product_name = product_name;
      if (total_quantity) product.total_quantity = total_quantity;
      if (cost_per_item) product.cost_per_item = cost_per_item;

      if (unit_of_measurement_id) {
        const unit_of_measurement = await UnitOfMeasurement.findByPk(
          unit_of_measurement_id
        );

        if (!unit_of_measurement)
          return res.status(404).send({ erro: "unidade de medida não existe" });

        product.unit_of_measurement_id = unit_of_measurement_id;
      }

      if (product_type_id) {
        const product_type = await UnitOfMeasurement.findByPk(product_type_id);

        if (!product_type)
          return res.status(404).send({ erro: "tipo de produto não existe" });

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

      if (!product) return res.status(404).send({ erro: "produto não existe" });

      await product.destroy();

      res.send();
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
