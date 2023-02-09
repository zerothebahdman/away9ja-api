import Joi from 'joi';
import { MaritalStatus } from '../../config/constants';

export const updateUserAccount = {
  body: Joi.object().keys({
    fullName: Joi.string().min(3).lowercase().max(40).optional(),
    username: Joi.string().min(3).lowercase().max(40).optional(),
    businessName: Joi.string().min(3).lowercase().max(40).optional(),
    maritalStatus: Joi.string()
      .valid(...Object.values(MaritalStatus))
      .optional(),
    phoneNumber: Joi.string().max(12).strict().optional().messages({
      'string.optional': 'Oops!, you have to specify an email address',
    }),
    gender: Joi.string().optional().valid('male', 'female'),
    address: Joi.string().optional().lowercase(),
    stateOfOrigin: Joi.string().optional().lowercase(),
  }),
};
