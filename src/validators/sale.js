const { celebrate, Joi, Segments } = require("celebrate");

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      payment_method_id: Joi.number().integer().required(),
      costumer_id: Joi.number().integer(),
      items: Joi,
    }),
  }),

  update: celebrate({
    [Segments.BODY]: Joi.object().keys({
      payment_method_id: Joi.number().integer(),
      costumer_id: Joi.number().integer(),
    }),
  }),
};
