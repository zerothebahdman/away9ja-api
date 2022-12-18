import { Router, Request, Response, NextFunction } from "express";

import { socialController } from "../../controllers/controllers.module";

import { isUserAuthenticated } from "../../middlewares/auth.middleware";
import validate from "../../middlewares/validate";

import { CreatePostValidator } from "../../../validators/social.postValidator";

const route = Router();

route.post(
  "/create-post",
  isUserAuthenticated,
  validate(CreatePostValidator),
  (req: Request, res: Response, next: NextFunction) => {
    socialController.createPost(req, res, next);
  }
);

route.get(
  "/get-all-post",
  isUserAuthenticated,
  (req: Request, res: Response, next: NextFunction) => {
    socialController.getAllPost(req, res, next);
  }
);

route.post(
  "/edit-post",
  isUserAuthenticated,
  (req: Request, res: Response, next: NextFunction) => {
    socialController.editPost(req, res, next);
  }
);

route.delete(
  "/delete-post",
  (req: Request, res: Response, next: NextFunction) => {
    //loginUser._loginUser(req, res, next);
    socialController.deletePost(req, res, next);
  }
);

export default route;
