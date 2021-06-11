const { celebrate, Joi, Segments } = require("celebrate");

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      cnpj: Joi.string().length(14).required(),
      fantasy_name: Joi.string().min(2).max(255).required(),
      social_reason: Joi.string().min(5).max(255).required(),
      place_number: Joi.number().integer().max(999).required(),
      companie_password: Joi.string().min(8).max(255).required(),
      cep: Joi.string().length(8).required(),
      state: Joi.string().length(2).required(),
      nature_of_the_business: Joi.string().min(10).max(255),
      commercial_email: Joi.string().email().min(5).max(255),
      plan_id: Joi.number().integer().required(),
    }),
  }),

  update: celebrate({
    [Segments.BODY]: Joi.object().keys({
      cnpj: Joi.string().length(14),
      fantasy_name: Joi.string().min(2).max(255),
      social_reason: Joi.string().min(5).max(255),
      place_number: Joi.number().integer().max(999),
      companie_password: Joi.string().min(8).max(255),
      cep: Joi.string().length(8),
      state: Joi.string().length(2),
      nature_of_the_business: Joi.string().min(10).max(255),
      commercial_email: Joi.string().email().min(5).max(255),
      plan_id: Joi.number().integer(),
      plan_id: Joi.number().integer(),
    }),
  }),
};
