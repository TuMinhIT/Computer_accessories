import Joi from "joi";

export const createProductSchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    description: Joi.string().email().required(),
    price: Joi.number().min(6).optional(),
    images: Joi.array().items(Joi.string()).required(),
});

export const updateProductSchema = Joi.object({
    name: Joi.string().min(2).max(50).optional(),
    description: Joi.string().email().optional(),
    price: Joi.number().min(6).optional(),
    images: Joi.array().items(Joi.string()).optional(),
});

