const Address = require("../models/Address");

module.exports = {
  async update(req, res) {
    try {
      const { id } = req.params;

      const { cep, street, complement, district, city, uf } = req.body;

      const address = await Address.findByPk(id, {
        attributes: ["id", "cep", "street", "complement", "district", "city", "uf"],
      });

      if (!address)
        return res
          .status(404)
          .send({ error: "Endereço requesitado não existe" });

      if (cep) address.cep = cep;
      if (street) address.street = street;
      if (complement) address.complement = complement;
      if (district) address.district = district;
      if (city) address.city = city;
      if (uf) address.uf = uf;

      await address.save();

      res.send(address);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
