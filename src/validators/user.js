const { celebrate, Joi, Segments } = require("celebrate");

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      rg: Joi.string().length(9).required(),
      cpf: Joi.string().length(11).required(),
      user_name: Joi.string().min(5).required(),
      user_password: Joi.string().min(8).required(),
      branch_id: Joi.number().integer().min(1).required(),
      role_id: Joi.number().integer().required(),
      permissions: Joi.string().required(),
    }),
  }),

  update: celebrate({
    [Segments.BODY]: Joi.object().keys({
      rg: Joi.string().length(9),
      cpf: Joi.string().length(11),
      user_name: Joi.string().min(5),
      user_password: Joi.string().min(8),
      branch_id: Joi.number().integer().min(1),
      role_id: Joi.number().integer(),
    }),
  }),
}