const { celebrate, Joi, Segments } = require("celebrate");

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      product_name: Joi.string().max(45).required(),
      description: Joi.string(),
      cost_per_item: Joi.number().required(),
      bar_code: Joi.string().required(),
      product_url: Joi.any(),
      unit_of_measurement_id: Joi.number().integer().required(),
      product_type_id: Joi.number().integer().required(),
      company_id: Joi.number().integer().required(),
    }),
  }),

  update: celebrate({
    [Segments.BODY]: Joi.object().keys({
      product_name: Joi.string().max(45),
      description: Joi.string(),
      bar_code: Joi.string(),
      cost_per_item: Joi.number(),
      product_url: Joi.any(),
      unit_of_measurement_id: Joi.number().integer(),
      product_type_id: Joi.number().integer(),
      company_id: Joi.number().integer(),
    }),
  }),
};
