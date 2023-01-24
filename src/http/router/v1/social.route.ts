import { Router, Request, Response, NextFunction } from 'express';
import { socialController } from '../../controllers/controllers.module';
import { isUserAuthenticated } from '../../middlewares/auth.middleware';
import validate from '../../middlewares/validate';
import {
  CreatePostValidator,
  CreateCommentValidator,
} from '../../../validators/SocialPost.validator';
import { restrictAccessTo } from '../../middlewares/role.middleware';
import { ROLE } from '../../../../config/constants';
import { addCategoryValidator } from '../../../validators/marketPlace.validator';

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

route
  .route('/pending-anonymous-post')
  .get(
    isUserAuthenticated,
    restrictAccessTo(ROLE.ADMIN),
    (req: Request, res: Response, next: NextFunction) => {
      socialController.getAnonymousPost(req, res, next);
    },
  );
route
  .route('/anonymous-post/:postId')
  .patch(
    isUserAuthenticated,
    restrictAccessTo(ROLE.ADMIN),
    (req: Request, res: Response, next: NextFunction) => {
      socialController.approveAnonymousPost(req, res, next);
    },
  )
  .delete(
    isUserAuthenticated,
    restrictAccessTo(ROLE.ADMIN),
    (req: Request, res: Response, next: NextFunction) => {
      socialController.deleteAnonymousPost(req, res, next);
    },
  );

route
  .route('/post-categories')
  .get(
    isUserAuthenticated,
    validate(addCategoryValidator),
    (req: Request, res: Response, next: NextFunction) => {
      socialController.getAllPostCategory(req, res, next);
    },
  )
  .post(
    isUserAuthenticated,
    restrictAccessTo(ROLE.ADMIN),
    (req: Request, res: Response, next: NextFunction) => {
      socialController.addPostCategory(req, res, next);
    },
  );

export default route;
