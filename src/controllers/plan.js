const Plan = require("../models/Plan");

module.exports = {
  async index(req, res) {
    try {
      const plans = await Plan.findAll({
        attributes: [
          "id",
          "plan_name",
          "branch_limit",
          "user_limit_per_branch",
          "use_phone_for_sale",
          "access_website",
          "value",
        ],
      });

      res.send(plans);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  async find(req, res) {
    try {
      const { id } = req.params;

      const plan = await Plan.findByPk(id, {
        attributes: [
          "id",
          "plan_name",
          "branch_limit",
          "user_limit_per_branch",
          "use_phone_for_sale",
          "access_website",
          "value",
        ],
      });

      res.send(plan);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
