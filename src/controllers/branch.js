const Branch = require("../models/Branch");
const Company = require("../models/Company");

module.exports = {
  async index(req, res) {
    const branches = await Branch.findAll({
      attributes: [
        "branch_name",
        "cep",
        "branch_email",
        "place_number",
        "company_id",
      ],
    });

    res.send(branches);
  },

  async store(req, res) {
    const {
      branch_name,
      cep,
      branch_email,
      place_number,
      company_id,
    } = req.body;

    const company = await Company.findByPk(company_id);

    if (!company) return res.status(404).send({ erro: "compania não existe" });

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
  },

  async delete(req, res) {
    const { id } = req.params;

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
  },
};
