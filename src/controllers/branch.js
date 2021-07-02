const { Op } = require("sequelize");
const Address = require("../models/Address");
const Branch = require("../models/Branch");
const Company = require("../models/Company");

module.exports = {
  async index(req, res) {
    try {
      const { id } = req.params;

      let branches;

      if (id)
        branches = await Branch.findAll({
          where: {
            company_id: id,
          },
          attributes: ["id", "branch_name", "branch_email", "place_number", "created_at"],
          include: [
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
            {
              model: Company,
              attributes: [
                "id",
                "cnpj",
                "fantasy_name",
                "social_reason",
                "place_number",
                "nature_of_the_business",
                "commercial_email",
              ],
            },
          ],
        });
      else
        branches = await Branch.findAll({
          attributes: ["id", "branch_name", "branch_email", "place_number", "created_at"],
          include: [
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
            {
              model: Company,
              attributes: [
                "id",
                "cnpj",
                "fantasy_name",
                "social_reason",
                "place_number",
                "nature_of_the_business",
                "commercial_email",
              ],
            },
          ],
        });

      res.send(branches);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async find(req, res) {
    try {
      const { id } = req.params;

      const branches = await Branch.findByPk(id, {
        attributes: ["id", "branch_name", "branch_email", "place_number", "created_at"],
        include: [
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
          {
            model: Company,
            attributes: [
              "id",
              "cnpj",
              "fantasy_name",
              "social_reason",
              "place_number",
              "nature_of_the_business",
              "commercial_email",
            ],
          },
        ],
      });

      res.send(branches);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async store(req, res) {
    try {
      const {
        branch_name,
        branch_email,
        place_number,
        company_id,
        address,
      } = req.body;

      const company = await Company.findByPk(company_id, {
        attributes: [
          "id",
          "cnpj",
          "fantasy_name",
          "social_reason",
          "place_number",
          "nature_of_the_business",
          "commercial_email",
        ],
      });

      if (!company)
        return res
          .status(404)
          .send({ error: "Compania requesitada não existe" });

      let branchAddress;

      const addressFind = await Address.findOne({
        where: {
          cep: address.cep,
        },
      });

      if (addressFind) branchAddress = addressFind;
      else {
        const newAddress = await Address.create(address);

        branchAddress = newAddress;
      }
      const branch = await Branch.create({
        branch_name,
        branch_email,
        place_number,
        company_id,
        address_id: branchAddress.id,
      });

      res.status(201).send({
        id: branch.id,
        branch_name: branch.branch_name,
        place_number: branch.place_number,
        company: company,
        address: branchAddress,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;

      const { branch_name, cep, branch_email, place_number } = req.body;

      const branch = await Branch.findByPk(id, {
        attributes: ["id", "branch_name", "branch_email", "place_number"],
        include: [
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
          {
            model: Company,
            attributes: [
              "id",
              "cnpj",
              "fantasy_name",
              "social_reason",
              "place_number",
              "nature_of_the_business",
              "commercial_email",
            ],
          },
        ],
      });

      if (!branch) return res.status(404).send({ error: "afilial não existe" });

      if (branch_name) branch.branch_name = branch_name;
      if (place_number) branch.place_number = place_number;
      if (branch_email) branch.branch_email = branch_email;

      await branch.save();

      res.send(branch);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;

      const branch = await Branch.findByPk(id);

      if (!branch)
        return res.status(404).send({ error: "Filial requesitada não existe" });

      await branch.destroy();

      res.send();
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
