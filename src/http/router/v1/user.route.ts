import { Router } from 'express';
import { userController } from '../../controllers/controllers.module';
import { isUserAuthenticated } from '../../middlewares/auth.middleware';
import validate from '../../middlewares/validate';
import { updateUserAccount } from '../../../validators/User.validation';

const route = Router();

route.route('/account-status').get((req, res, next) => {
  userController.getAccountStatus(req, res, next);
});

route
  .route('/me')
  .get(isUserAuthenticated, (req, res, next) => {
    userController.getMyProfile(req, res, next);
  })
  .patch(isUserAuthenticated, validate(updateUserAccount), (req, res, next) => {
    userController.updateMyProfile(req, res, next);
  });

route.get('/:userId', isUserAuthenticated, (req, res, next) => {
  userController.getUserProfile(req, res, next);
});

route.route('/invite').post(isUserAuthenticated, (req, res, next) => {
  userController.inviteUser(req, res, next);
});

export default route;
