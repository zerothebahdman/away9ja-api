import Joi from "joi";

export const CreatePostValidator = {
  body: Joi.object().keys({
    body: Joi.string().min(1).lowercase().max(150).required().messages({
      "string.min": " Oops!, body can not be empty",
      "string.max": "You have exceeded more than 150 characters",
    }),
    locattion: Joi.string().min(3).lowercase().max(20),
  }),
};
