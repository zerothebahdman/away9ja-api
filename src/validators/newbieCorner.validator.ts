import Joi from 'joi';

export const newbieTagValidator = {
  body: Joi.object().keys({
    name: Joi.string().lowercase().max(50).required().messages({
      'string.max': 'You have exceeded more than 50 characters',
    }),
  }),
};

export const createNewbieArticleValidator = {
  body: Joi.object().keys({
    heading: Joi.string().lowercase().max(50).required().messages({
      'string.max': 'You have exceeded more than 50 characters',
    }),
    body: Joi.string().min(3).lowercase().max(1000),
    newbieTag_id: Joi.string().min(3).lowercase(),
  }),
};
