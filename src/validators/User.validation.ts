import Joi from 'joi';
import { MaritalStatus } from '../../config/constants';

export const updateUserAccount = {
  body: Joi.object().keys({
    fullName: Joi.string().min(3).max(40).optional(),
    username: Joi.string().min(3).lowercase().max(40).optional(),
    businessName: Joi.string().min(3).max(40).optional(),
    maritalStatus: Joi.string()
      .valid(...Object.values(MaritalStatus))
      .optional(),
    phoneNumber: Joi.string().max(12).strict().optional().messages({
      'string.optional': 'Oops!, you have to specify an email address',
    }),
    gender: Joi.string().optional().valid('male', 'female'),
    address: Joi.string().optional(),
    stateOfOrigin: Joi.string().optional(),
    avatar: Joi.string().optional(),
    dob: Joi.date().optional(),
  }),
};

export const userNotificationSettings = {
  body: Joi.object().keys({
    events: Joi.boolean().optional(),
    newbieCornerArticles: Joi.boolean().optional(),
    marketPlace: Joi.boolean().optional(),
    postFeed: Joi.boolean().optional(),
    directMessages: Joi.boolean().optional(),
  }),
};
