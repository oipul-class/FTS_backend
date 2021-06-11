const { celebrate, Joi, Segments } = require("celebrate");

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      branch_name: Joi.string().min(2).max(255).required(),
      cep: Joi.string().length(8).required(),
      branch_email: Joi.string().email().min(5).max(255),
      place_number: Joi.number().integer().required(),
      company_id: Joi.number().integer().required(),
    }),
  }),

  update: celebrate({
    [Segments.BODY]: Joi.object().keys({
      branch_name: Joi.string().min(2).max(255),
      cep: Joi.string().length(8),
      branch_email: Joi.string().email().min(5).max(255),
      place_number: Joi.number().integer(),
    }),
  }),
};
