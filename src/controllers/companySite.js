const Address = require("../models/Address");
const Branch = require("../models/Branch");
const Company = require("../models/Company");
const Phone = require("../models/Phone");
const Product = require("../models/Product");
const ProductType = require("../models/ProductType");
const UnitOfMeasurement = require("../models/UnitOfMeasurement");
const Website = require("../models/Website");

module.exports = {
  async index(req, res) {
    try {
      const { company_id } = req.params;

      const site = await Website.findOne({
        attributes: [
          "id",
          "logo_img",
          "banner_img",
          "slogan",
          "primary_color",
          "secondary_color",
          "light_color",
          "dark_color",
        ],
        include: {
          model: Company,
          required: true,
          where: {
            id: company_id,
          },
          attributes: [
            "id",
            "cnpj",
            "fantasy_name",
            "social_reason",
            "place_number",
            "nature_of_the_business",
            "commercial_email",
            "plan_id",
          ],
          include: [
            {
              model: Branch,
              where: {
                company_id,
              },
              attributes: ["id", "branch_name", "branch_email", "place_number"],
              include: [
                {
                  model: Phone,
                  attributes: ["id", "phone"],
                },
                {
                  model: Address,
                  attributes: [
                    "cep",
                    "street",
                    "complement",
                    "district",
                    "city",
                    "uf",
                  ],
                },
              ],
            },
            {
              model: Product,
              attributes: [
                "id",
                "product_name",
                "description",
                "cost_per_item",
                "image_url",
              ],
              include: {
                model: ProductType,
                attributes: ["id", "type"],
              },
            },
          ],
        },
      });

      const productsByType = await ProductType.findAll({
        attributes: ["id", "type"],
        include: {
          model: Product,
          attributes: [
            "id",
            "product_name",
            "description",
            "cost_per_item",
            "image_url",
          ],
          required: true,
          where: {
            company_id,
          },
        },
      });

      res.send({
        id: site.id,
        logo_img: site.logo_img,
        banner_img: site.banner_img,
        slogan: site.slogan,
        primary_color: site.primary_color,
        secondary_color: site.secondary_color,
        light_color: site.light_color,
        dark_color: site.dark_color,
        Company: {
          id: site.Company.id,
          cnpj: site.Company.cnpj,
          fantasy_name: site.Company.fantasy_name,
          social_reason: site.Company.social_reason,
          place_number: site.Company.place_number,
          nature_of_the_business: site.Company.nature_of_the_business,
          commercial_email: site.Company.commercial_email,
          Branches: site.Company.Branches,
          Products: site.Company.Products,
          ProductsByType: productsByType,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

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
        dark_color,
      } = req.body;

      const company = await Company.findByPk(company_id);

      if (!company)
        return res.status(500).send({
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
        dark_color,
      });

      res.status(201).send({
        id: website.id,
        logo_img: website.logo_img,
        banner_img: website.banner_img,
        slogan: website.slogan,
        primary_color: website.primary_color,
        secondary_color: website.secondary_color,
        light_color: website.light_color,
        dark_color: website.dark_color,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async update(req, res) {
    try {
      const { company_id } = req.params;
      const {
        logo_firebase_url,
        banner_firebase_url,
        slogan,
        primary_color,
        secondary_color,
        light_color,
        dark_color,
      } = req.body;

      const company = await Company.findByPk(company_id);

      if (!company)
        return res.status(500).send({
          error: "Comapnhia não existe",
        });

      if (!company.WebsiteId)
        return res.status(400).send({ error: "Companhia não possui o site" });

      const website = await company.getWebsite();

      if (logo_firebase_url) website.logo_img = logo_firebase_url;
      if (banner_firebase_url) website.banner_img = banner_firebase_url;
      if (slogan) website.slogan = slogan;
      if (primary_color) website.primary_color = primary_color;
      if (secondary_color) website.secondary_color = secondary_color;
      if (light_color) website.light_color = light_color;
      if (dark_color) website.dark_color = dark_color;

      await website.save();

      res.status(200).send({
        id: website.id,
        logo_img: website.logo_img,
        banner_img: website.banner_img,
        slogan: website.slogan,
        primary_color: website.primary_color,
        secondary_color: website.secondary_color,
        light_color: website.light_color,
        dark_color: website.dark_color,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
