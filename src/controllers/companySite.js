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
              ],
              include: {
                model: ProductType,
                attributes: ["id", "type"],
              },
            },
          ],
        },
      });

      res.send(site);
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
