const { celebrate, Joi, Segments } = require("celebrate");

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      product_name: Joi.string().max(45).required(),
      total_quantity: Joi.number().integer().required(),
      cost_per_item: Joi.number().required(),
      unit_of_measurement_id: Joi.number().integer().required(),
      product_type_id: Joi.number().integer().required(),
      company_id: Joi.number().integer().required(),
    }),
  }),

  update: celebrate({
    [Segments.BODY]: Joi.object().keys({
      product_name: Joi.string().max(45),
      total_quantity: Joi.number().integer(),
      cost_per_item: Joi.number(),
      unit_of_measurement_id: Joi.number().integer(),
      product_type_id: Joi.number().integer(),
      company_id: Joi.number().integer(),
    }),
  }),
};
