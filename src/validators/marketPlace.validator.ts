import Joi from 'joi';

export const addItemValidator = {
  body: Joi.object().keys({
    name: Joi.string().lowercase().max(50).required().messages({
      'string.max': 'You have exceeded more than 50 characters',
    }),
    location: Joi.string().min(3).lowercase().max(20),
    category_id: Joi.string().min(3).lowercase().max(50),
    description: Joi.string().lowercase().max(100),
    photos: Joi.array().items(Joi.string()).optional(),
  }),
};

export const addCategoryValidator = {
  body: Joi.object().keys({
    name: Joi.string().lowercase().max(50).messages({
      'string.max': 'You have exceeded more than 50 characters',
    }),
  }),
};
