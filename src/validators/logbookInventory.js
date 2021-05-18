const { celebrate, Joi, Segments } = require("celebrate");

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      data_of_acquisition: Joi.required(),
      quantity_acquired: Joi.number().integer().required(),
      branch_id: Joi.number().integer().required(),
      costumer_id: Joi.number().required(),
      product_id: Joi.number().integer().required(),
      lot: Joi.object(),
    }),
  }),

  update: celebrate({
    [Segments.BODY]: Joi.object().keys({
      data_of_acquisition: Joi.object(),
      quantity_acquired: Joi.number().integer(),
      product_id: Joi.number().integer(),
      costumer_id: Joi.number(),
    }),
  }),
};
