import { Router, Request, Response, NextFunction } from 'express';
import { marketController } from '../../controllers/controllers.module';
import { isUserAuthenticated } from '../../middlewares/auth.middleware';
import validate from '../../middlewares/validate';
import {
  addItemValidator,
  addCategoryValidator,
  editItemValidator,
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
  '/admin/allCategories',
  isUserAuthenticated,
  (req: Request, res: Response, next: NextFunction) => {
    marketController.getAllCategory(req, res, next);
  },
);

export default route;
