const { celebrate, Joi, Segments } = require("celebrate");

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      manager_name: Joi.string().min(5).max(255).required(),
      rg: Joi.string().length(12).required(),
      cpf: Joi.string().length(14).required(),
      manager_password: Joi.string().min(8).max(255).required(),
      branch_id: Joi.number().integer().min(1).required(),
      role_id: Joi.number().integer().min(1).required(),
    }),
  }),

  update: celebrate({
    [Segments.BODY]: Joi.object().keys({
      manager_name: Joi.string().min(5).max(255),
      rg: Joi.string().length(12),
      cpf: Joi.string().length(14),
      manager_password: Joi.string().min(8).max(255),
      branch_id: Joi.number().integer().min(1),
      role_id: Joi.number().integer().min(1),
    }),
  }),
};
