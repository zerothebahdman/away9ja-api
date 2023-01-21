import { Router, Request, Response, NextFunction } from 'express';
import { socialController } from '../../controllers/controllers.module';
import { isUserAuthenticated } from '../../middlewares/auth.middleware';
import validate from '../../middlewares/validate';
import {
  CreatePostValidator,
  CreateCommentValidator,
} from '../../../validators/SocialPost.validator';

const route = Router();

route.post(
  '/create-post',
  isUserAuthenticated,
  validate(CreatePostValidator),
  (req: Request, res: Response, next: NextFunction) => {
    socialController.createPost(req, res, next);
  },
);

route.post(
  '/like-post/:post_id',
  isUserAuthenticated,
  (req: Request, res: Response, next: NextFunction) => {
    socialController.likePost(req, res, next);
  },
);

route.get(
  '/get-all-post',
  isUserAuthenticated,
  (req: Request, res: Response, next: NextFunction) => {
    socialController.getAllPost(req, res, next);
  },
);

route.post(
  '/edit-post',
  isUserAuthenticated,
  (req: Request, res: Response, next: NextFunction) => {
    socialController.editPost(req, res, next);
  },
);

route.delete(
  '/delete-post',
  isUserAuthenticated,
  (req: Request, res: Response, next: NextFunction) => {
    socialController.deletePost(req, res, next);
  },
);

route.post(
  '/post/comment',
  isUserAuthenticated,
  validate(CreateCommentValidator),
  (req: Request, res: Response, next: NextFunction) => {
    socialController.createComment(req, res, next);
  },
);

route.get(
  '/post/comment/:post_id',
  isUserAuthenticated,
  (req: Request, res: Response, next: NextFunction) => {
    socialController.getPostComment(req, res, next);
  },
);

route.get(
  '/comment/sub/:comment_id',
  isUserAuthenticated,
  (req: Request, res: Response, next: NextFunction) => {
    socialController.getSubComment(req, res, next);
  },
);

export default route;
