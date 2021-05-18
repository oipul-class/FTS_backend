const { celebrate, Joi, Segments } = require("celebrate");

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      date_of_acquisition: Joi.string().required(),
      quantity_acquired: Joi.number().integer().required(),
      branch_id: Joi.number().integer().required(),
      product_id: Joi.number().integer().required(),
      lot: Joi.object(),
    }),
  }),

  update: celebrate({
    [Segments.BODY]: Joi.object().keys({
      date_of_acquisition: Joi.string(),
      quantity_acquired: Joi.number().integer(),
      product_id: Joi.number().integer(),
      costumer_id: Joi.number(),
    }),
  }),
};
