const { celebrate, Joi, Segments } = require("celebrate");

module.exports = {
  update: celebrate({
    [Segments.BODY]: Joi.object().keys({
      received: Joi.boolean(),
    }),
  }),
};
