import Joi from "joi";

// register
export const registerSchema = Joi.object({
  userName: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).optional(),
  phone: Joi.string().length(10).required(),
});

// login
export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).optional(),
});

// update info
export const updateSchema = Joi.object({
  userName: Joi.string().required(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional().allow(null, ""),
  avatar: Joi.string().uri().allow(null, ""),
});
