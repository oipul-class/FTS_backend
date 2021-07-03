const { celebrate, Joi, Segments } = require("celebrate");

module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      logo_firebase_url: Joi.string().required(),
      banner_firebase_url: Joi.string().required(),
      slogan: Joi.string().required(),
      primary_color: Joi.string().required(),
      secondary_color: Joi.string().required(),
      light_color: Joi.string().required(),
    }),
  }),
};
