import Joi from 'joi';
import { MaritalStatus, AccountStatus, ROLE } from '../../config/constants';
import { objectId } from './Custom.validator';
import { Gender } from '@prisma/client';

export const LoginValidator = {
  body: Joi.object().keys({
    email: Joi.string().email().lowercase().required().messages({
      'any.email': 'Oops!, you need to provide valid email address',
      'any.required': 'Oops!, you have to specify an email address',
    }),
    password: Joi.string().min(8).required().messages({
      'string.min': 'Oops!, password must be at least 8 characters long',
      'any.required': 'Oops!, you have to specify a password',
    }),
    pushNotificationId: Joi.string().optional(),
  }),
};

export const CreateUserValidator = {
  body: Joi.object().keys({
    fullName: Joi.string().min(3).max(40).required(),
    username: Joi.string().min(3).lowercase().max(40).required(),
    businessName: Joi.string().min(3).max(40).optional(),
    maritalStatus: Joi.string()
      .valid(...Object.values(MaritalStatus))
      .required(),
    email: Joi.string().email().lowercase().required().messages({
      'string.email': 'Oops!, you need to provide valid email address',
      'string.required': 'Oops!, you have to specify an email address',
    }),
    phoneNumber: Joi.string().max(12).strict().required().messages({
      'string.required': 'Oops!, you have to specify an email address',
    }),
    /** Password requirements:
     * At least 8 characters—the more characters, the better
     * A mixture of both uppercase and lowercase - letters
     * A mixture of letters and numbers
     * Inclusion of at least one special character, e.g., ! @ # ? ]
     */
    password: Joi.string()
      .min(8)
      .pattern(
        new RegExp(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
        ),
      )
      .required()
      .messages({
        'string.pattern.base':
          'Oops!, password must be at least 8 characters long and must contain at least one uppercase letter, one lowercase letter, one number and one special character',
        'string.required': 'Oops!, you have to specify a password',
      }),
    confirmPassword: Joi.ref('password'),
    gender: Joi.string()
      .required()
      .valid(...Object.values(Gender)),
    address: Joi.string().required(),
    stateOfOrigin: Joi.string().required(),
    inviteCode: Joi.string().required().trim(),
    role: Joi.string().valid(...Object.values(ROLE)),
    avatar: Joi.string().optional(),
  }),
};

export const ResendUserEmailVerificationValidator = {
  body: Joi.object().keys({
    email: Joi.string().email().lowercase().required().messages({
      'string.email': 'Oops!, you need to provide valid email address',
      'string.required': 'Oops!, you have to specify an email address',
    }),
  }),
};

export const RegenerateAccessToken = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

export const ResetPasswordValidator = {
  body: Joi.object().keys({
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.ref('password'),
    token: Joi.string().required(),
  }),
};

export const verifyUserEmailValidator = {
  body: Joi.object().keys({
    otp: Joi.string().required(),
  }),
};

export const forgotPasswordValidator = {
  body: Joi.object().keys({
    email: Joi.string().email().lowercase().required().messages({
      'any.required': 'Oops!, you have to specify an email address',
    }),
  }),
};

export const resendOtpValidator = {
  body: Joi.object().keys({
    email: Joi.string().email().lowercase().required().messages({
      'any.required': 'Oops!, you have to specify an email address',
    }),
  }),
};

export const referredUserValidator = {
  body: Joi.object().keys({
    user: Joi.custom(objectId).required(),
    status: Joi.string()
      .valid(...Object.values(AccountStatus))
      .required(),
  }),
};
