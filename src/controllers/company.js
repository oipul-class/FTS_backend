const { Op } = require("sequelize");
const Company = require("../models/Company");
const Plan = require("../models/Plan");
const Address = require("../models/Address");
const bcryptjs = require("bcryptjs");
const Branch = require("../models/Branch");

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
          "nature_of_the_business",
          "commercial_email",
        ],
        include: [
          {
            model: Plan,
            attributes: [
              "id",
              "plan_name",
              "branch_limit",
              "user_limit_per_branch",
              "use_phone_for_sale",
            ],
          },
          {
            model: Address,
            attributes: [
              "id",
              "cep",
              "street",
              "complement",
              "district",
              "city",
              "uf",
            ],
          },
        ],
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
          "nature_of_the_business",
          "commercial_email",
          "plan_id",
        ],
        include: [
          {
            model: Plan,
            attributes: [
              "id",
              "plan_name",
              "branch_limit",
              "user_limit_per_branch",
              "use_phone_for_sale",
            ],
          },
          {
            model: Address,
            attributes: [
              "id",
              "cep",
              "street",
              "complement",
              "district",
              "city",
              "uf",
            ],
          },
        ],
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
        phone,
        companie_password,
        nature_of_the_business,
        commercial_email,
        plan_id,
        address,
      } = req.body;

      const plan = await Plan.findByPk(plan_id, {
        attributes: [
          "id",
          "plan_name",
          "branch_limit",
          "user_limit_per_branch",
          "use_phone_for_sale",
        ],
      });
      if (!plan)
        return res.status(404).send({ error: "Plano requisitado não existe" });

      let companyAddress;

      const addressFind = await Address.findOne({
        where: {
          cep: address.cep,
        },
      });

      if (addressFind) companyAddress = addressFind;
      else {
        const newAddress = await Address.create(address);

        companyAddress = newAddress;
      }
      const company = await Company.create({
        cnpj,
        fantasy_name,
        social_reason,
        place_number,
        companie_password: bcryptjs.hashSync(companie_password),
        nature_of_the_business,
        commercial_email,
        plan_id,
        address_id: companyAddress.id,
      });

      await company.addPermission(1);

      const companyBranch = await Branch.create({
        branch_name: company.fantasy_name,
        branch_email: null,
        place_number: company.place_number,
        company_id: company.id,
        address_id: company.address_id,
      });

      await companyBranch.createPhone({
        phone
      })

      res.status(201).send({
        id: company.id,
        cnpj,
        fantasy_name,
        social_reason,
        place_number,
        nature_of_the_business,
        commercial_email,
        plan,
        address: {
          id: companyAddress.id,
          cep: companyAddress.cep,
          street: companyAddress.street,
          complement: companyAddress.complement,
          district: companyAddress.district,
          city: companyAddress.city,
          uf: companyAddress.uf,
        },
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
          "nature_of_the_business",
          "commercial_email",
        ],
        include: [
          {
            model: Plan,
            attributes: [
              "id",
              "plan_name",
              "branch_limit",
              "user_limit_per_branch",
              "use_phone_for_sale",
            ],
          },
          {
            model: Address,
            attributes: [
              "id",
              "cep",
              "street",
              "complement",
              "district",
              "city",
              "uf",
            ],
          },
        ],
      });

      if (!company)
        return res
          .status(404)
          .send({ error: "Compania requisitada não existe" });

      if (cnpj) company.cnpj = cnpj;
      if (fantasy_name) company.fantasy_name = fantasy_name;
      if (social_reason) company.social_reason = social_reason;
      if (place_number) company.place_number = place_number;

      if (companie_password) {
        const cryptPassword = bcryptjs.hashSync(companie_password);

        company.companie_password = cryptPassword;
      }

      if (state) company.state = state;
      if (nature_of_the_business)
        company.nature_of_the_business = nature_of_the_business;
      if (commercial_email) company.commercial_email = commercial_email;

      if (plan_id) {
        const plan = await Plan.findByPk(plan_id);

        if (!plan)
          return res
            .status(404)
            .send({ error: "Plano requesitado não existe" });

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

      const company = await Company.findByPk(id);

      if (!company)
        return res
          .status(404)
          .send({ error: "Companhia requesitada não existe" });

      await company.destroy();

      res.send();
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
