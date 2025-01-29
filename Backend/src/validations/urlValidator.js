import Joi from "joi";

const urlSchema = Joi.object({
  originalUrl: Joi.string()
    .uri({ scheme: [/https?/] })
    .required()
    .messages({
      "string.base": "Original URL must be a string.",
      "string.uri":
        "Original URL must be a valid URI starting with http or https.",
      "any.required": "Original URL is required.",
    }),

  slug: Joi.string().alphanum().min(3).max(15).optional().messages({
    "string.base": "Slug must be a string.",
    "string.alphanum": "Slug must contain only letters and numbers.",
    "string.min": "Slug must have at least {#limit} characters.",
    "string.max": "Slug must not exceed {#limit} characters.",
  }),
});

export { urlSchema };
