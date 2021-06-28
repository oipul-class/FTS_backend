const { celebrate, Joi, Segments } = require("celebrate");

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      costumer_name: Joi.string().max(45),
      cpf: Joi.string().length(11).required(),
    }),
  }),

  update: celebrate({
    [Segments.BODY]: Joi.object().keys({
      costumer_name: Joi.string().max(45),
      cpf: Joi.string().length(11),
    }),
  }),
};
