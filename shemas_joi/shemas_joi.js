const Joi = require("joi");

const newContactSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `missing required email field`,
  }),
  email: Joi.string().required().email().messages({
    "any.required": `missing required email field`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `missing required email field`,
  }),
});

const contactUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
})
  .required()
  .min(1)
  .messages({
    "object.min": "missing fields",
  });

const updateFavoriteContactSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  newContactSchema,
  contactUpdateSchema,
  updateFavoriteContactSchema,
};
