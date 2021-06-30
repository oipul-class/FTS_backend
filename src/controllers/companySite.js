const Company = require("../models/Company");
const Website = require("../models/Website");

module.exports = {
  async store(req, res) {
    try {
      const { company_id } = req.params;
      const { website_slogan, website_customization } = req.body;
      const { firebase_url } = req.file;

      const company = await Company.findByPk(company_id);

      if (!company)
        return res.status(400).send({
          error: "Comapnhia não existe",
        });

      if (company.WebsiteId) return res.status(400).send({ error: "Companhia já possui o site"})
      if (typeof website_customization == String)
        return res
          .status(400)
          .send({ error: "Configurações não estão no formato requestidao" });

      const website = await company.createWebsite({
        website_logo: firebase_url,
        website_customization,
      });

      res.status(201).send({
        id: website.id,
        website_logo: website.website_logo,
        website_customization: website.website_customization,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
