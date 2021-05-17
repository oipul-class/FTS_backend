const { celebrate, Joi, Segments } = require("celebrate");

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      type: Joi.string().max(20).required(),
    }),
  }),

  update: celebrate({
    [Segments.BODY]: Joi.object().keys({
      type: Joi.string().required(),
    }),
  }),
};
