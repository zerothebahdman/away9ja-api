import { Request, Response, NextFunction } from 'express';
import AppException from '../exceptions/AppException';
import EmailService from '../services/Email.service';
import httpStatus from 'http-status';
import prisma from '../database/model.module';
import AuthService from '../services/Auth.service';
const emailService = new EmailService();

export default class CreateUser {
  constructor(private readonly authService: AuthService) {}

  async createUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response<any, Record<string, any>>> {
    try {
      const _userExists = await prisma.user.findUnique({
        where: { email: req.body.email },
      });

      if (_userExists)
        return next(
          new AppException(`Oops!, ${_userExists.email} is taken`, 422)
        );

      /** if user does not exist create the user using the user service */
      const { user, OTP_CODE } = await this.authService.createUser(req.body);

      /** Send email verification to user */
      await emailService._sendUserEmailVerificationEmail(
        user.fullName,
        user.email,
        OTP_CODE
      );

      return res.status(httpStatus.OK).json({
        status: 'success',
        message: `We've sent an verification email to your mail`,
        user,
      });
    } catch (err: any) {
      return next(
        new AppException(
          err.message,
          err.status || httpStatus.INTERNAL_SERVER_ERROR
        )
      );
    }
  }
}
