/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import UserService from '../../services/User.service';
import httpStatus from 'http-status';
import AppException from '../../exceptions/AppException';
import { RequestType } from '../middlewares/auth.middleware';
import EmailService from '../../services/Email.service';
import pick from '../../utils/pick';

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
}
