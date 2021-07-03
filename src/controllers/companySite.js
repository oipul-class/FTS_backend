const Company = require("../models/Company");

module.exports = {
  async store(req, res) {
    try {
      const { company_id } = req.params;
      const {
        logo_firebase_url,
        banner_firebase_url,
        slogan,
        primary_color,
        secondary_color,
        light_color,
      } = req.body;

      const company = await Company.findByPk(company_id);

      if (!company)
        return res.status(400).send({
          error: "Comapnhia não existe",
        });

      if (company.WebsiteId)
        return res.status(400).send({ error: "Companhia já possui o site" });

      const website = await company.createWebsite({
        logo_img: logo_firebase_url,
        banner_img: banner_firebase_url,
        slogan,
        primary_color,
        secondary_color,
        light_color,
      });

      res.status(201).send({
        id: website.id,
        logo_img: website.logo_img,
        banner_img: website.banner_img,
        slogan: website.slogan,
        primary_color: website.primary_color,
        secondary_color: website.secondary_color,
        light_color: website.light_color,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
