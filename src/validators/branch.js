const { celebrate, Joi, Segments } = require("celebrate");

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      branch_name: Joi.string().min(2).max(255).required(),
      branch_email: Joi.string().email().min(5).max(255),
      place_number: Joi.number().integer().required(),
      phone: Joi.string().length(12).required(),
      company_id: Joi.number().integer().required(),
      address: Joi.object().keys({
        cep: Joi.string().length(8).required(),
        street: Joi.string().required(),
        complement: Joi.string(),
        district: Joi.string().required(),
        city: Joi.string().required(),
        uf: Joi.string().length(2).required(),
      }),
    }),
  }),

  update: celebrate({
    [Segments.BODY]: Joi.object().keys({
      branch_name: Joi.string().min(2).max(255),
      branch_email: Joi.string().email().min(5).max(255),
      place_number: Joi.number().integer(),
      phone: Joi.string().length(12),
    }),
  }),
};
