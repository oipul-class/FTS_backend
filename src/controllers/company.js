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
    try {
      const { id } = req.params;

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
        include: {
          model: Plan,
        },
      });

      res.send(company);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async store(req, res) {
    try {
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

      const plan = await Plan.findByPk(plan_id);

      if (!plan)
        return res.status(404).send({ error: "Plano requisitado não existe" });

      const company = await Company.create({
        cnpj,
        fantasy_name,
        social_reason,
        place_number,
        companie_password: bcryptjs.hashSync(companie_password),
        cep,
        state,
        nature_of_the_business,
        commercial_email,
        plan_id,
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
        plan,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async update(req, res) {
    try {
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
        ],
        include: {
          model: Plan,
        },
      });

      if (!company)
        return res
          .status(404)
          .send({ erro: "Compania requisitada não existe" });

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
    try {
      const { id } = req.params;

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
        return res
          .status(404)
          .send({ erro: "Companhia requesitada não existe" });

      await company.destroy();

      res.send();
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
