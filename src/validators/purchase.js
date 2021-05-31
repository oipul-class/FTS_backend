const { celebrate, Joi, Segments } = require("celebrate");

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      payment_method_id: Joi.number().integer().required(),
      branch_id: Joi.number().integer().required(),
      items: Joi.array(),
    }),
  }),

  update: celebrate({
    [Segments.BODY]: Joi.object().keys({
      payment_method_id: Joi.number().integer(),
    }),
  }),
};
