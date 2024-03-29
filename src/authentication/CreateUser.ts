/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import AppException from '../exceptions/AppException';
import EmailService from '../services/Email.service';
import httpStatus from 'http-status';
import prisma from '../database/model.module';
import AuthService from '../services/Auth.service';
import RESERVED_NAMES from '../utils/reservedNames';
import HelperClass from '../utils/helper';
import { AccountStatus, ROLE } from '../../config/constants';
const emailService = new EmailService();

export default class CreateUser {
  constructor(private readonly authService: AuthService) {}

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const emailTaken = await prisma.user.findUnique({
        where: { email: req.body.email },
      });
      const userNameTaken = await prisma.user.findUnique({
        where: { username: req.body.username },
      });
      delete req.body.confirmPassword;
      if (emailTaken) throw new Error(`Oops!, ${emailTaken.email} is taken`);
      if (userNameTaken)
        throw new Error(`Oops!, ${userNameTaken.username} is taken`);

      // check that the username is in the right format
      HelperClass.userNameValidator(req.body.username);
      req.body.fullName = HelperClass.titleCase(req.body.fullName);

      // Reserved usernames
      if (RESERVED_NAMES.includes(req.body.username))
        throw new Error('Username unavailable, please choose another username');

      req.body.referralCode = HelperClass.generateRandomChar(6, 'upper-num');

      req.body.status = AccountStatus.PENDING;
      if (req.body.role !== 'admin') {
        req.body.inviteCode = req.body.inviteCode.toUpperCase();
        /** Save the referral and referrer details */
        const referrer = await prisma.user.findUnique({
          where: { referralCode: req.body.inviteCode },
        });

        if (!referrer) {
          return next(
            new AppException('Invalid referral code', httpStatus.BAD_REQUEST),
          );
        }

        if (referrer.role === ROLE.USER && referrer.invitedUsersCount >= 5) {
          return next(
            new AppException(
              'Referrer has reached the maximum number of referrals',
              httpStatus.BAD_REQUEST,
            ),
          );
        } else if (
          referrer.role === ROLE.EXCLUSIVE_USER &&
          referrer.invitedUsersCount >= 10
        ) {
          return next(
            new AppException(
              'Referrer has reached the maximum number of referrals',
              httpStatus.BAD_REQUEST,
            ),
          );
        }

        await prisma.user.update({
          where: { id: referrer.id },
          data: {
            invitedUsersCount: {
              increment: 1,
            },
          },
        });
      }

      /** if user does not exist create the user using the user service */
      const { user, OTP_CODE } = await this.authService.createUser(req.body);

      /** Send email verification to user */
      await emailService._sendUserEmailVerificationEmail(
        user.fullName,
        user.email,
        OTP_CODE,
      );

      return res.status(httpStatus.OK).json({
        status: 'success',
        message: `We've sent an email verification to your mail`,
        user,
      });
    } catch (err: any) {
      return next(new AppException(err.message, err.status));
    }
  }
}
