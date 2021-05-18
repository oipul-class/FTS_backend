const { celebrate, Joi, Segments } = require("celebrate");

module.exports = {
  update: celebrate({
    [Segments.BODY]: Joi.object().keys({
      lot_number: Joi.string(),
      manufacture_date: Joi.date(),
      expiration_date: Joi.date(),
    }),
  }),
};
