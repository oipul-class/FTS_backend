const ProductType = require("../models/ProductType");

module.exports = {
  async index(req, res) {
    try {
      const productTypes = await ProductType.findAll();

      res.send(productTypes);
    } catch (error) {
      console.error(error);
      res.send(error);
    }
  },

  async find(req, res) {
    try {
      const { id } = req.params;

      const productType = await ProductType.findByPk(id);

      res.send(productType);
    } catch (error) {
      console.error(error);
      res.send(error);
    }
  },

  async store(req, res) {
    const { type } = req.body;

    try {
      const productType = await ProductType.create({
        type,
      });

      res.status(201).send(productType);
    } catch (error) {
      console.error(error);
      res.send(error);
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const { type } = req.body;

    try {
      
      const productType = await ProductType.findByPk(id);

      if (!productType) return res.status(404).send({erro: "Não existe esse registro na tabela"})

      productType.type = type;

      await productType.save();

      res.send(productType)
    } catch (error) {
      console.error(error);
      res.send(error);
    }
  },

  async delete(req, res) {
    const { id } = req.params;

    try {
      
      const productType = await ProductType.findByPk(id);

      if (!productType) return res.status(404).send({erro: "Não existe esse registro na tabela"})

      await productType.destroy();

      res.send();
    } catch (error) {
      console.error(error);
      res.send(error);
    }
  }
  
  
};
