import { Router, Request, Response, NextFunction } from 'express';
import {
  createUser,
  verifyUserEmail,
  loginUser,
  passwordReset,
} from '../../../authentication/authentication.module';
import {
  CreateUserValidator,
  forgotPasswordValidator,
  LoginValidator,
  referredUserValidator,
  RegenerateAccessToken,
  ResetPasswordValidator,
  verifyUserEmailValidator,
} from '../../../validators/Auth.validation';
import validate from '../../middlewares/validate';
import { resendOtpValidator } from '../../../validators/Auth.validation';
import { isUserAuthenticated } from '../../middlewares/auth.middleware';
import { userController } from '../../controllers/controllers.module';

const route = Router();

route.post('/create-user', validate(CreateUserValidator), (req, res, next) => {
  createUser.createUser(req, res, next);
});

route.post(
  '/verify-email',
  validate(verifyUserEmailValidator),
  (req, res, next) => {
    verifyUserEmail.execute(req, res, next);
  },
);

route.post('/login', validate(LoginValidator), (req, res, next) => {
  loginUser._loginUser(req, res, next);
});

route.post(
  '/regenerate-access-token',
  validate(RegenerateAccessToken),
  (req, res, next) => {
    loginUser.regenerateAccessToken(req, res, next);
  },
);

route.post('/resend-otp', validate(resendOtpValidator), (req, res, next) => {
  loginUser.resendOtp(req, res, next);
});

route.post(
  '/forgot-password',
  validate(forgotPasswordValidator),
  (req: Request, res: Response, next: NextFunction) => {
    passwordReset.sendResetPasswordEmail(req, res, next);
  },
);

route.post(
  '/reset-password',
  validate(ResetPasswordValidator),
  (req: Request, res: Response, next: NextFunction) => {
    passwordReset.resetPassword(req, res, next);
  },
);

route
  .route('/referral')
  .get(isUserAuthenticated, (req, res, next) => {
    userController.getReferredUsers(req, res, next);
  })
  .post(
    isUserAuthenticated,
    validate(referredUserValidator),
    (req, res, next) => {
      userController.verifyReferredUser(req, res, next);
    },
  );

export default route;
