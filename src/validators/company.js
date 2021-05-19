const { celebrate, Joi, Segments } = require("celebrate");

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      cnpj: Joi.string().length(18).required(),
      fantasy_name: Joi.string().min(2).max(255).required(),
      social_reason: Joi.string().min(5).max(255).required(),
      place_number: Joi.number().integer().required(),
      companie_password: Joi.string().min(8).max(255).required(),
      cep: Joi.string().length(9).required(),
      state: Joi.string().length(2).required(),
      nature_of_the_business: Joi.string().min(10).max(255),
      commercial_email: Joi.string().email().min(5).max(255),
    }),
  }),

  update: celebrate({
    [Segments.BODY]: Joi.object().keys({
      cnpj: Joi.string().length(18),
      fantasy_name: Joi.string().min(2).max(255),
      social_reason: Joi.string().min(5).max(255),
      place_number: Joi.number().integer().min(1).max(3),
      companie_password: Joi.string().min(8).max(255),
      cep: Joi.string().length(9),
      state: Joi.string().length(2),
      nature_of_the_business: Joi.string().min(10).max(255),
      commercial_email: Joi.string().email().min(5).max(255),
    }),
  }),
};
