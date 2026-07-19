import Joi from "joi";

export const articleCreate = Joi.object({
  title: Joi.string().trim().max(200).required(),
  summary: Joi.string().trim().allow("", null).optional(),
  content: Joi.string().trim().allow("", null).optional(),
  thumbnail: Joi.string().trim().allow("", null).optional(),
  plant: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required(),
});

export const articleUpdate = Joi.object({
  title: Joi.string().trim().max(200),
  summary: Joi.string().trim().allow("", null),
  content: Joi.string().trim().allow("", null),
  thumbnail: Joi.string().trim().allow("", null),
  plant: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
  views: Joi.number().integer().min(0),
  ratingAverage: Joi.number().min(0).max(5),
  ratingCount: Joi.number().integer().min(0),
}).min(1);
