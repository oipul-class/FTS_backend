const { celebrate, Joi, Segments } = require("celebrate");

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      user_name: Joi.string().min(5).required(),
      rg: Joi.string().length(12).required(),
      cpf: Joi.string().length(14).required(),
      user_password: Joi.string().min(8).required(),
      manager_id: Joi.number().integer().min(1).required(),
    }),
  }),

  update: celebrate({
    [Segments.BODY]: Joi.object().keys({
      user_name: Joi.string().min(5),
      rg: Joi.string().length(12),
      cpf: Joi.string().length(14),
      user_password: Joi.string().min(8),
      manager_id: Joi.number().integer().min(1),
    }),
  }),
}