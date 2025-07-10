import Joi from 'joi';

export const createUserSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  phone: Joi.string().pattern(/^[0-9+\-\s()]{10,15}$/).required(),
  email: Joi.string().email().max(255).required(),
  address: Joi.string().min(10).max(500).required(),
  city: Joi.string().min(2).max(100).required(),
  employer: Joi.string().min(2).max(100).required(),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().min(2).max(100).optional(),
  phone: Joi.string().pattern(/^[0-9+\-\s()]{10,15}$/).optional(),
  email: Joi.string().email().max(255).optional(),
  address: Joi.string().min(10).max(500).optional(),
  city: Joi.string().min(2).max(100).optional(),
  employer: Joi.string().min(2).max(100).optional(),
});