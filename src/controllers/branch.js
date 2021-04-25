const { Op } = require("sequelize");
const Branch = require("../models/Branch");
const Company = require("../models/Company");

module.exports = {
  async index(req, res) {
    const { company_id } = req.query;

    try {
      const branches = await Branch.findAll({
        where: {
          company_id: company_id,
        },
        attributes: [
          "id",
          "branch_name",
          "cep",
          "branch_email",
          "place_number",
          "company_id",
        ],
        include: {
          association: "Company",
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
        },
      });

      res.send(branches);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async find(req, res) {
    const { branch_name, cep } = req.body;

    try {
      const branches = await Branch.findAll({
        attributes: [
          "branch_name",
          "cep",
          "branch_email",
          "place_number",
          "company_id",
        ],
        where: {
          [Op.and]: [
            {
              branch_name: { [Op.substring]: branch_name ? branch_name : "" },
            },
            {
              cep: { [Op.substring]: cep ? cep : "" },
            },
          ],
        },
        include: {
          association: "Company",
          attributes: [
            "cnpj",
            "fantasy_name",
            "social_reason",
            "place_number",
            "cep",
            "state",
            "nature_of_the_business",
            "commercial_email",
          ],
        },
      });

      res.send(branches);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async store(req, res) {
    const {
      branch_name,
      cep,
      branch_email,
      place_number,
      company_id,
    } = req.body;

    try {
      const company = await Company.findByPk(company_id);

      if (!company)
        return res.status(404).send({ erro: "compania não existe" });

      const branch = await Branch.create({
        branch_name,
        cep,
        branch_email,
        place_number,
        company_id,
      });

      res
        .status(201)
        .send({ branch_name, cep, place_number, companhia: company });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async update(req, res) {
    const { id } = req.params;

    const {
      branch_name,
      cep,
      branch_email,
      place_number,
      company_id,
    } = req.body;
    try {
      const branch = await Branch.findByPk(id, {
        attributes: [
          "branch_name",
          "cep",
          "branch_email",
          "place_number",
          "company_id",
        ],
      });

      if (!branch) return res.status(404).send({ erro: "afilial não existe" });

      if (branch_name) branch.branch_name = branch_name;
      if (place_number) branch.place_number = place_number;
      if (branch_email) branch.branch_email = branch_email;
      if (cep) branch.cep = cep;
      if (company_id) branch.company_id = company_id;

      await branch.save();

      res.send(branch);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async delete(req, res) {
    const { id } = req.params;

    try {
      const branch = await Branch.findByPk(id, {
        attributes: [
          "branch_name",
          "cep",
          "branch_email",
          "place_number",
          "company_id",
        ],
      });

      if (!branch) return res.status(404).send({ erro: "afilial não existe" });

      await branch.destroy();

      res.send({
        status: "deletado",
        afilial: branch,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
