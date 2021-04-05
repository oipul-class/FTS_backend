const Company = require("../models/Company");
const Plan = require("../models/Plan");

module.exports = {
  async index(req, res) {
    const companys = await Company.findAll({
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

    res.send(companys);
  },

  async store(req, res) {
    const {
      cnpj,
      fantasy_name,
      social_reason,
      place_number,
      cep,
      state,
      nature_of_the_business,
      commercial_email,
    } = req.body;

    const company = await Company.create({
      cnpj,
      fantasy_name,
      social_reason,
      place_number,
      cep,
      state,
      nature_of_the_business,
      commercial_email,
    });

    res.status(201).send(company);
  },

  async update(req, res) {
    const { id } = req.params;

    const {
      cnpj,
      fantasy_name,
      social_reason,
      place_number,
      cep,
      state,
      nature_of_the_business,
      commercial_email,
    } = req.body;

    const company = await Company.findByPk(id);

    if (!company) return res.status(404).send({ erro: "compania não existe" });

    if (cnpj) company.cnpj = cnpj;
    if (fantasy_name) company.fantasy_name = fantasy_name;
    if (social_reason) company.social_reason = social_reason;
    if (place_number) company.place_number = place_number;
    if (cep) company.cep = cep;
    if (state) company.state = state;
    if (nature_of_the_business)
      company.nature_of_the_business = nature_of_the_business;
    if (commercial_email) company.commercial_email = commercial_email;

    await company.save();

    res.send(company);
  },

  async delete(req, res) {
    const { id } = req.params;

    const company = await Company.findByPk(id);

    if (!company) return res.status(404).send({ erro: "compania não existe" });

    await company.destroy();

    res.send({
      status: "deletado",
      compania: company,
    });
  },

  async setPlan(req, res) {
    const { company_id, plan_id } = req.body;

    const company = await Company.findByPk(company_id);

    if (!company) return res.status(404).send({ erro: "compania não existe" });

    const plan = await Plan.findByPk(plan_id);

    if (!plan) return res.status(404).send({ erro: "plano não existe" });

    company.plan_id = plan_id;

    res.send({
      compania: company,
      plano: plan,
    });
  },
};
