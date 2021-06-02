const { Op } = require("sequelize");
const Company = require("../models/Company");
const Plan = require("../models/Plan");
const bcryptjs = require("bcryptjs");

module.exports = {
  async index(req, res) {
    try {
      const companies = await Company.findAll({
        attributes: [
          "id",
          "cnpj",
          "fantasy_name",
          "social_reason",
          "place_number",
          "cep",
          "state",
          "nature_of_the_business",
          "commercial_email",
        ],
        include: {
          model: Plan,
        },
      });

      res.send(companies);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async find(req, res) {
    const { id } = req.body;

    try {
      const company = await Company.findByPk(id, {
        attributes: [
          "id",
          "cnpj",
          "fantasy_name",
          "social_reason",
          "place_number",
          "cep",
          "state",
          "nature_of_the_business",
          "commercial_email",
          "plan_id",
        ],
      });

      res.send(company);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async store(req, res) {
    const {
      cnpj,
      fantasy_name,
      social_reason,
      place_number,
      companie_password,
      cep,
      state,
      nature_of_the_business,
      commercial_email,
    } = req.body;

    const cryptPassword = bcryptjs.hashSync(companie_password);

    try {
      const company = await Company.create({
        cnpj,
        fantasy_name,
        social_reason,
        place_number,
        companie_password: cryptPassword,
        cep,
        state,
        nature_of_the_business,
        commercial_email,
      });

      await company.addPermission(1);

      res.status(201).send({
        id: company.id,
        cnpj,
        fantasy_name,
        social_reason,
        place_number,
        cep,
        state,
        nature_of_the_business,
        commercial_email,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async update(req, res) {
    const { id } = req.params;

    const {
      cnpj,
      fantasy_name,
      social_reason,
      place_number,
      companie_password,
      cep,
      state,
      nature_of_the_business,
      commercial_email,
      plan_id,
    } = req.body;

    try {
      const company = await Company.findByPk(id, {
        attributes: [
          "cnpj",
          "fantasy_name",
          "social_reason",
          "place_number",
          "cep",
          "state",
          "nature_of_the_business",
          "commercial_email",
          "plan_id",
        ],
      });

      if (!company)
        return res.status(404).send({ erro: "compania não existe" });

      if (cnpj) company.cnpj = cnpj;
      if (fantasy_name) company.fantasy_name = fantasy_name;
      if (social_reason) company.social_reason = social_reason;
      if (place_number) company.place_number = place_number;

      if (companie_password) {
        const cryptPassword = bcryptjs.hashSync(companie_password);

        company.companie_password = cryptPassword;
      }

      if (cep) company.cep = cep;
      if (state) company.state = state;
      if (nature_of_the_business)
        company.nature_of_the_business = nature_of_the_business;
      if (commercial_email) company.commercial_email = commercial_email;

      if (plan_id) {
        const plan = await Plan.findByPk(plan_id);

        if (!plan)
          return res.status(404).send({ erro: "Plano requesitado não existe" });

        company.plan_id = plan_id;
      }

      await company.save();

      res.send(company);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async delete(req, res) {
    const id = req.params.id;

    try {
      const company = await Company.findByPk(id, {
        attributes: [
          "id",
          "cnpj",
          "fantasy_name",
          "social_reason",
          "place_number",
          "cep",
          "state",
          "nature_of_the_business",
          "commercial_email",
          "plan_id",
        ],
      });

      if (!company)
        return res.status(404).send({ erro: "compania não existe" });

      await company.destroy();

      res.send({
        status: "deletado",
        compania: company,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
