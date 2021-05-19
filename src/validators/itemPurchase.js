const { celebrate, Joi, Segments } = require("celebrate");

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      quantity: Joi.number().integer().required(),
      discount: Joi.number(),
      product_id: Joi.number().integer().required(),
      purchase_id: Joi.number().integer().required(),
    }),
  }),
};
