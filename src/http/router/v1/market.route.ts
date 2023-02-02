import { Router, Request, Response, NextFunction } from 'express';
import { marketController } from '../../controllers/controllers.module';
import { isUserAuthenticated } from '../../middlewares/auth.middleware';
import validate from '../../middlewares/validate';
import {
  addItemValidator,
  addCategoryValidator,
  editItemValidator,
  createMarketPlaceCommentValidator,
} from '../../../validators/marketPlace.validator';

const route = Router();

route.post(
  '/add-item',
  isUserAuthenticated,
  validate(addItemValidator),
  (req: Request, res: Response, next: NextFunction) => {
    marketController.addMarketItem(req, res, next);
  },
);

route.get(
  '/get-all-my-items',
  isUserAuthenticated,
  (req: Request, res: Response, next: NextFunction) => {
    marketController.getAllMyItem(req, res, next);
  },
);

route.get(
  '/get-item/:itemId',
  isUserAuthenticated,
  (req: Request, res: Response, next: NextFunction) => {
    marketController.getMarketItem(req, res, next);
  },
);

route.patch(
  '/edit-item',
  isUserAuthenticated,
  validate(editItemValidator),
  (req: Request, res: Response, next: NextFunction) => {
    marketController.editMarketItem(req, res, next);
  },
);

route.delete(
  '/delete-marketItem',
  isUserAuthenticated,
  (req: Request, res: Response, next: NextFunction) => {
    marketController.deleteMarketItemById(req, res, next);
  },
);

route.get(
  '/listings',
  isUserAuthenticated,
  (req: Request, res: Response, next: NextFunction) => {
    marketController.listings(req, res, next);
  },
);
route.post(
  '/admin/add-category',
  isUserAuthenticated,
  validate(addCategoryValidator),
  (req: Request, res: Response, next: NextFunction) => {
    marketController.addCategory(req, res, next);
  },
);

route.get(
  '/marketplace-category',
  isUserAuthenticated,
  (req: Request, res: Response, next: NextFunction) => {
    marketController.getAllCategory(req, res, next);
  },
);

route.post(
  '/create_marketPlace_Comment',
  isUserAuthenticated,
  validate(createMarketPlaceCommentValidator),
  (req: Request, res: Response, next: NextFunction) => {
    marketController.createMarketPlaceComment(req, res, next);
  },
);

route.get(
  '/marketPlaceComment/maincomment-author/:market_Item_Id',
  isUserAuthenticated,
  (req: Request, res: Response, next: NextFunction) => {
    marketController.getMarketPlaceCommentByAuthor(req, res, next);
  },
);

route.get(
  '/marketPlaceComment/maincomment-user/:market_Item_Id',
  isUserAuthenticated,
  (req: Request, res: Response, next: NextFunction) => {
    marketController.getMarketPlaceCommentByUser(req, res, next);
  },
);

route.get(
  '/marketPlaceComment/subcomment/:marketPlace_comment_Id',
  isUserAuthenticated,
  (req: Request, res: Response, next: NextFunction) => {
    marketController.getMarketPlaceSubComment(req, res, next);
  },
);
export default route;
