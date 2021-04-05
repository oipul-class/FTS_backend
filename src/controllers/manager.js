const Manager = require("../models/Manager");
const Branch = require("../models/Branch");

module.exports = {
  async index(req, res) {
    const managers = await Manager.findAll({
      attributes: ["manager_name", "rg", "cpf", "branch_id"],
    });

    res.send(managers);
  },

  async store(req, res) {
    const { manager_name, rg, cpf, manager_password, branch_id } = req.body;

    const branch = await Branch.findByPk(branch_id);

    if (!branch) return res.status(404).send({ erro: "afilial não existe" });

    await Manager.create({
      manager_name,
      rg,
      cpf,
      manager_password,
      branch_id,
    });

    res.status(201).send({ manager_name, rg, cpf, afilial: company });
  },

  async update(req, res) {
    const { id } = req.params;

    const { manager_name, rg, cpf, manager_password, branch_id } = req.body;

    const manager = await Manager.findByPk(id);

    if (!manager) return res.status(404).send({ erro: "gerente não existe"});

    if (manager_name) branch.manager_name = manager_name;
    if (rg) branch.rg = rg;
    if (cpf) branch.cpf = cpf;
    if (manager_password) branch.manager_password = manager_password;

    if (branch_id) {
      const branch = await Branch.findByPk(branch_id);

      if (!branch) return res.status(404).send({ erro: "afilial não existe" });
      
      branch.branch_id = branch_id;
    }

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
