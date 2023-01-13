import Joi from 'joi';
import { objectId } from './Custom.validator';

export const createEventValidator = {
  body: Joi.object().keys({
    title: Joi.string().required().min(3).messages({
      'string.required': 'Oops!, you have to specify a title',
      'string.min': 'Oops!, title must be at least 3 characters long',
    }),
    location: Joi.string().required().messages({
      'string.required': 'Oops!, you have to specify a location',
    }),
    description: Joi.string().required().messages({
      'string.required': 'Oops!, you have to specify a description',
    }),
    photo: Joi.string().required().messages({
      'string.required': 'Oops!, you have to specify a photo for this event',
    }),
    date: Joi.date().required().messages({
      'string.required': 'Oops!, you have to specify a date for this event',
    }),
    time: Joi.string().required().messages({
      'string.required': 'Oops!, you have to specify a time for this event',
    }),
  }),
};

export const updateEventValidator = {
  body: Joi.object().keys({
    title: Joi.string().optional().min(3).messages({
      'string.min': 'Oops!, title must be at least 3 characters long',
    }),
    location: Joi.string().optional(),
    description: Joi.string().optional(),
    photo: Joi.string().optional(),
    date: Joi.date().optional(),
    time: Joi.date().optional(),
  }),
};

export const deleteEventValidator = {
  params: Joi.object().keys({
    eventId: Joi.custom(objectId).required(),
  }),
};
