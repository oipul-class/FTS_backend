const { celebrate, Joi, Segments } = require("celebrate");

module.exports = {
  update: celebrate({
    [Segments.BODY]: Joi.object().keys({
      paid: Joi.boolean(),
    }),
  }),
};
