/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import UserService from '../../services/User.service';
import httpStatus from 'http-status';
import AppException from '../../exceptions/AppException';
import { RequestType } from '../middlewares/auth.middleware';
import EmailService from '../../services/Email.service';
import pick from '../../utils/pick';
import HelperClass from '../../utils/helper';
import RESERVED_NAMES from '../../utils/reservedNames';
import { ROLE } from '../../../config/constants';

export default class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly emailService: EmailService,
  ) {}

  async getReferredUsers(req: RequestType, res: Response, next: NextFunction) {
    try {
      const filter = pick(req.query, ['status']);
      const options = pick(req.query, ['orderBy', 'limit', 'page']);
      Object.assign(filter, { inviteCode: req.user.referralCode });
      const users = await this.userService.getReferredUsers(filter, options);
      return res.status(httpStatus.OK).json({
        users,
      });
    } catch (err: any) {
      return next(
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST),
      );
    }
  }

  async verifyReferredUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { user } = req.body;
      delete req.body.user;
      const updatedUser = await this.userService.updateUserById(user, req.body);
      await this.emailService.sendUserAccountVerifiedEmail(
        updatedUser.email,
        updatedUser.fullName,
      );
      res.status(httpStatus.OK).json({ status: 'success', updatedUser });
    } catch (err: any) {
      return next(
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST),
      );
    }
  }

  async getMyProfile(req: RequestType, res: Response, next: NextFunction) {
    try {
      const me = await this.userService.getUserById(req.user.id);
      return res.status(httpStatus.OK).json({
        status: 'success',
        me,
      });
    } catch (err: any) {
      return next(
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST),
      );
    }
  }

  async updateMyProfile(req: RequestType, res: Response, next: NextFunction) {
    try {
      if (req.body.username && req.body.username !== req.user.username) {
        const userNameTaken = await this.userService.getUserByUsername(
          req.body.username,
        );
        if (userNameTaken)
          throw new Error(`Oops!, ${userNameTaken.username} is taken`);
        // check that the username is in the right format
        HelperClass.userNameValidator(req.body.username);
        // Reserved usernames
        if (RESERVED_NAMES.includes(req.body.username))
          throw new Error(
            'Username unavailable, please choose another username',
          );
      }
      const me = await this.userService.updateUserById(req.user.id, req.body);
      return res.status(httpStatus.OK).json({
        status: 'success',
        me,
      });
    } catch (err: any) {
      return next(
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST),
      );
    }
  }

  async getUserProfile(req: RequestType, res: Response, next: NextFunction) {
    try {
      const user = await this.userService.getUserById(req.params.userId);
      return res.status(httpStatus.OK).json({
        status: 'success',
        user,
      });
    } catch (err: any) {
      return next(
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST),
      );
    }
  }

  async inviteUser(req: RequestType, res: Response, next: NextFunction) {
    try {
      const user = await this.userService.getUserById(req.user.id);
      await this.emailService.sendUserInvitationEmail(
        req.body.email,
        user.fullName,
        user.referralCode,
      );
      return res.status(httpStatus.OK).json({
        status: 'success',
        message: 'Invitation sent successfully',
      });
    } catch (err: any) {
      return next(
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST),
      );
    }
  }

  async getAccountStatus(req: RequestType, res: Response, next: NextFunction) {
    try {
      const filter = pick(req.query, ['id', 'email']);
      const user = await this.userService.getUser(filter);
      return res.status(httpStatus.OK).json({
        status: 'success',
        user,
      });
    } catch (err: any) {
      return next(
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST),
      );
    }
  }

  async getNotificationSettings(
    req: RequestType,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const settings = await this.userService.getNotificationSettings(
        req.user.id,
      );
      return res.status(httpStatus.OK).json({
        status: 'success',
        settings,
      });
    } catch (err: any) {
      return next(
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST),
      );
    }
  }

  async updateNotificationSettings(
    req: RequestType,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const settings = await this.userService.updateNotificationSettings(
        req.user.id,
        req.body,
      );
      return res.status(httpStatus.OK).json({
        status: 'success',
        settings,
      });
    } catch (err: any) {
      return next(
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST),
      );
    }
  }

  async validateReferralCode(req: Request, res: Response, next: NextFunction) {
    try {
      const { referralCode } = req.body;
      const user = await this.userService.getUser({ referralCode });
      if (!user) throw new Error('Invalid referral code');
      if (user.role === ROLE.USER && user.invitedUsersCount >= 5) {
        return next(
          new AppException(
            'user has reached the maximum number of referrals',
            httpStatus.BAD_REQUEST,
          ),
        );
      } else if (
        user.role === ROLE.EXCLUSIVE_USER &&
        user.invitedUsersCount >= 10
      ) {
        return next(
          new AppException(
            'user has reached the maximum number of referrals',
            httpStatus.BAD_REQUEST,
          ),
        );
      }
      return res.status(httpStatus.OK).json({
        status: 'success',
        canUseReferralCode: true,
        message: 'Referral code can be used',
      });
    } catch (err: any) {
      return next(
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST),
      );
    }
  }

  async deleteMe(req: RequestType, res: Response, next: NextFunction) {
    try {
      await this.userService.deleteUserById(req.user.id);
      return res.status(httpStatus.NO_CONTENT).json({
        status: 'success',
        message: 'User deleted successfully',
      });
    } catch (err: any) {
      return next(
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST),
      );
    }
  }
}
