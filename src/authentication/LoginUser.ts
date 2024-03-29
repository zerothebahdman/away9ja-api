import { NextFunction, Request, Response } from 'express';
import AppException from '../exceptions/AppException';
import httpStatus from 'http-status';
import AuthService from '../services/Auth.service';
import { User } from '@prisma/client';
import UserService from '../services/User.service';
import EncryptionService from '../services/Encryption.service';
import HelperClass from '../utils/helper';
import { AccountStatus, ROLE } from '../../config/constants';

export default class LoginUser {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly encryptionService: EncryptionService,
  ) {}
  async _loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const _userExists: User = await this.userService.getUserByEmail(
        req.body.email,
      );

      if (
        !_userExists ||
        !(await this.encryptionService.comparePassword(
          _userExists.password,
          req.body.password,
        ))
      )
        throw new Error(`Oops!, invalid email or password`);

      if (_userExists.is_email_verified !== true)
        next(
          new AppException(
            'Oops! email address is not verified',
            httpStatus.FORBIDDEN,
          ),
        );

      // check if the person that referred the user has approved the request
      if (_userExists.role !== ROLE.ADMIN)
        if (_userExists.status !== AccountStatus.VERIFIED)
          next(new AppException(`Oops!, your referrer has to verify you`, 403));

      const token = await this.authService.loginUser(_userExists);
      await this.userService.updateUserById(_userExists.id, {
        pushNotificationId: req.body.pushNotificationId,
      });

      const userNotificationSaved =
        await this.userService.getNotificationSettings(_userExists.id);
      if (!userNotificationSaved) {
        await this.userService.updateNotificationSettings(_userExists.id, {
          marketPlace: true,
          directMessages: true,
          events: true,
          newbieCornerArticles: true,
          postFeed: true,
        });
      }

      return res.status(httpStatus.ACCEPTED).json({
        user: HelperClass.removeUnwantedProperties(_userExists, [
          'email_verified_at',
          'email_verification_token',
          'email_verification_token_expiry',
          'password',
          'password_reset_token',
          'password_reset_token_expiry',
          'password_reset_token_expires_at',
        ]),
        token,
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        return next(new AppException(err.message, httpStatus.BAD_REQUEST));
      }
    }
  }

  async regenerateAccessToken(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = await this.authService.regenerateAccessToken(
        req.body.refreshToken,
      );
      if (!accessToken || accessToken.trim() === '')
        return next(
          new AppException(
            'Oops! Refresh token expired.',
            httpStatus.FORBIDDEN,
          ),
        );

      return res.status(httpStatus.OK).json({ status: 'success', accessToken });
    } catch (err: unknown) {
      if (err instanceof Error) {
        return next(new AppException(err.message, httpStatus.BAD_REQUEST));
      }
    }
  }

  async resendOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const _user: User = await this.userService.getUserByEmail(req.body.email);
      if (!_user)
        next(
          new AppException('Oops!, user does not exist', httpStatus.NOT_FOUND),
        );
      if (_user.is_email_verified === true)
        new Error(`Oops!, email has already been verified`);

      await this.authService.resendOtp(_user);
      return res.status(httpStatus.NO_CONTENT).send();
    } catch (err: unknown) {
      if (err instanceof Error) {
        return next(new AppException(err.message, httpStatus.BAD_REQUEST));
      }
    }
  }
}
