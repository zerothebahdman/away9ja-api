import { Router, Request, Response, NextFunction } from 'express';
import { newbieCornerController } from '../../controllers/controllers.module';
import { isUserAuthenticated } from '../../middlewares/auth.middleware';
import validate from '../../middlewares/validate';
import {
  newbieTagValidator,
  createNewbieArticleValidator,
} from '../../../validators/newbieCorner.validator';

const route = Router();

route.post(
  '/admin/add-newbie-Tag',
  isUserAuthenticated,
  validate(newbieTagValidator),
  (req: Request, res: Response, next: NextFunction) => {
    newbieCornerController.addNewbieTag(req, res, next);
  },
);

route.get(
  '/newbie-tag',
  isUserAuthenticated,
  (req: Request, res: Response, next: NextFunction) => {
    newbieCornerController.getAllNewbieTag(req, res, next);
  },
);
route.post(
  '/create-newbie-article',
  isUserAuthenticated,
  validate(createNewbieArticleValidator),
  (req: Request, res: Response, next: NextFunction) => {
    newbieCornerController.createNewbieArticle(req, res, next);
  },
);

route.get(
  '/get-newbie-article/:articleId',
  isUserAuthenticated,
  (req: Request, res: Response, next: NextFunction) => {
    newbieCornerController.getNewbieArticleById(req, res, next);
  },
);

route.get(
  '/get-all-newbie-articles',
  isUserAuthenticated,
  (req: Request, res: Response, next: NextFunction) => {
    newbieCornerController.getAllNewbieArticle(req, res, next);
  },
);

export default route;
