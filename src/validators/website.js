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
      dark_color: Joi.string().required(),
    }),
  }),

  update: celebrate({
    [Segments.BODY]: Joi.object().keys({
      logo_firebase_url: Joi.string(),
      banner_firebase_url: Joi.string(),
      slogan: Joi.string(),
      primary_color: Joi.string(),
      secondary_color: Joi.string(),
      light_color: Joi.string(),
      dark_color: Joi.string(),
    }),
  }),
};
