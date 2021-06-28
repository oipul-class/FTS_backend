const Costumer = require("../models/Costumer");

module.exports = {
  async index(req, res) {
    try {
      const { cpf } = req.params;

      let costumers;

      if (cpf) {
        costumers = await Costumer.findAll({ where: { cpf } });

        if (costumers == "")
          res.status(400).send({ error: "Cliente não cadastrado" });
      } else costumers = await Costumer.findAll();

      res.send(costumers);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async find(req, res) {
    try {
      const { id } = req.params;

      const costumer = await Costumer.findByPk(id);

      res.send(costumer);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async store(req, res) {
    try {
      const { costumer_name, cpf } = req.body;

      const costumer = await Costumer.create({
        costumer_name,
        cpf,
      });

      res.status(201).send(costumer);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;

      const { costumer_name, cpf } = req.body;

      const costumer = await Costumer.findByPk(id);

      if (!costumer)
        return res.status(404).send({ error: "Cliente requesitado não existe" });

      if (costumer_name) costumer.costumer_name = costumer_name;
      if (cpf) costumer.cpf = cpf;

      await costumer.save;

      res.send(costumer);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;

      const costumer = await Costumer.findByPk(id);

      if (!costumer)
        return res.status(404).send({ error: "Cliente requesitado não existe" });

      await costumer.destroy();

      res.send();
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
