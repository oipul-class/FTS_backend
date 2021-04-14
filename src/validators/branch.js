const { celebrate, Joi, Segments } = require("celebrate");

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      branch_name: Joi.string().min(2).max(255).required(),
      cep: Joi.string().length(10).required(),
      branch_email: Joi.string().email().min(5).max(255),
      place_number: Joi.number().integer().length(3).required(),
      company_id: Joi.number().integer().required()
    }),
  }),

  update: celebrate({
    [Segments.BODY]: Joi.object().keys({
      branch_name: Joi.string().min(2).max(255),
      cep: Joi.string().length(10),
      branch_email: Joi.string().email().min(5).max(255),
      place_number: Joi.number().integer().length(3),
      company_id: Joi.number().integer().required()
    }),
  }),
};
