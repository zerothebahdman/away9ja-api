import Joi from 'joi';

export const newbieTagValidator = {
  body: Joi.object().keys({
    name: Joi.string().max(50).required().messages({
      'string.max': 'You have exceeded more than 50 characters',
    }),
  }),
};

export const createNewbieArticleValidator = {
  body: Joi.object().keys({
    heading: Joi.string().max(50).required().messages({
      'string.max': 'You have exceeded more than 50 characters',
    }),
    body: Joi.string().min(3).max(1000),
    newbieTag: Joi.array().items(Joi.string()).required(),
    article_position: Joi.number().integer().required(),
  }),
};

export const editNewbieArticleValidator = {
  body: Joi.object().keys({
    heading: Joi.string().max(50).optional().messages({
      'string.max': 'You have exceeded more than 50 characters',
    }),
    body: Joi.string().min(3).max(1000).optional(),
    newbieTag: Joi.array().items(Joi.string()).optional(),
    article_position: Joi.number().integer().optional(),
  }),
};
