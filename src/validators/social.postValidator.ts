import Joi from "joi";

export const CreatePostValidator = {
  body: Joi.object().keys({
    body: Joi.string().lowercase().max(150).messages({
      "string.max": "You have exceeded more than 150 characters",
    }),
    location: Joi.string().min(3).lowercase().max(20),
    immages: Joi.array().items(Joi.string()).optional(),
    tags: Joi.array().items(Joi.string()).optional(),
    Post_comment: Joi.array()
      .items(Joi.string().lowercase().max(150))
      .messages({
        "string.max": "You have exceeded more than 150 characters",
      }),
    post_likes: Joi.array().items(Joi.string().min(1).lowercase().max(150)),
  }),
};
