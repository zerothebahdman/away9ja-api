import Joi from 'joi';
import { objectId } from './Custom.validator';

export const addItemValidator = {
  body: Joi.object().keys({
    name: Joi.string().max(50).required().messages({
      'string.max': 'You have exceeded more than 50 characters',
    }),
    location: Joi.string().min(3).max(20),
    marketplace_category_id: Joi.string().min(3).max(50).optional(),
    description: Joi.string().max(100),
    photos: Joi.array().items(Joi.string()).required(),
    amount: Joi.number().optional(),
  }),
};

export const editItemValidator = {
  body: Joi.object().keys({
    name: Joi.string()
      .max(50)
      .required()
      .messages({
        'string.max': 'You have exceeded more than 50 characters',
      })
      .optional(),
    location: Joi.string().min(3).max(20).optional(),
    marketplace_category_id: Joi.string().min(3).max(50).optional(),
    description: Joi.string().max(100).optional(),
    photos: Joi.array().items(Joi.string()).required(),
    amount: Joi.number().optional(),
  }),
};

export const addCategoryValidator = {
  body: Joi.object().keys({
    name: Joi.string().lowercase().max(50).messages({
      'string.max': 'You have exceeded more than 50 characters',
    }),
  }),
};

export const createMarketPlaceCommentValidator = {
  body: Joi.object().keys({
    body: Joi.string().max(150).messages({
      'string.max': 'You have exceeded more than 150 characters',
    }),
    marketPlaceId: Joi.string().min(3).lowercase().max(50).optional(),
    type: Joi.string().valid('mainComment', 'subComment'),
    parent_market_place_comment_id: Joi.when('type', {
      is: 'subComment',
      then: Joi.custom(objectId).required(),
    }),
  }),
};
