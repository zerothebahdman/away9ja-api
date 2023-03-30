import Joi from 'joi';
import { objectId } from './Custom.validator';
import { PostType } from '../../config/constants';

export const CreatePostValidator = {
  body: Joi.object().keys({
    body: Joi.string().optional(),
    post_type: Joi.string().valid(...Object.values(PostType)),
    location: Joi.string(),
    images: Joi.array().items(Joi.string()).optional(),
    tags: Joi.array().items(Joi.string()).optional(),
    isAnonymous: Joi.boolean().optional(),
    post_category_id: Joi.custom(objectId),
  }),
};

export const CreateCommentValidator = {
  body: Joi.object().keys({
    body: Joi.string().max(150).messages({
      'string.max': 'You have exceeded more than 150 characters',
    }),
    post_id: Joi.custom(objectId),
    type: Joi.string().valid('mainComment', 'subComment'),
    parent_post_comment_id: Joi.when('type', {
      is: 'subComment',
      then: Joi.custom(objectId).required(),
    }),
  }),
};

export const reportPost = {
  body: Joi.object().keys({
    post_id: Joi.custom(objectId).required(),
    reason: Joi.string().required(),
    description: Joi.string().required(),
  }),
};
