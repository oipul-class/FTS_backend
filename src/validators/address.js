const { celebrate, Joi, Segments } = require("celebrate");

module.exports = {
  update: celebrate({
    [Segments.BODY]: Joi.object().keys({
      cep: Joi.string().length(8),
      street: Joi.string(),
      complement: Joi.string(),
      district: Joi.string(),
      city: Joi.string(),
      uf: Joi.string().length(2),
    }),
  }),
};
