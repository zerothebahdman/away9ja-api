import { NextFunction } from 'express';
import AppException from '../exceptions/AppException';
import EncryptionService from './Encryption.service';
import TokenService from './Token.service';
import httpStatus from 'http-status';
import prisma from '../database/model.module';
import { User } from '@prisma/client';
import HelperClass from '../utils/helper';
import { createHash } from 'node:crypto';
import moment from 'moment';

export default class AuthService {
  constructor(
    private readonly encryptionService: EncryptionService,
    private readonly tokenService: TokenService
  ) {}

  async createUser(
    createBody: User
  ): Promise<{ user: User; OTP_CODE: string }> {
    createBody.password = await this.encryptionService.hashPassword(
      createBody.password
    );
    const OTP_CODE = HelperClass.generateRandomChar(6, 'num');
    const hashedToken = createHash('sha512')
      .update(String(OTP_CODE))
      .digest('hex');

    createBody.emailVerificationToken = hashedToken;
    createBody.emailVerificationTokenExpiry = moment()
      .add('6', 'hours')
      .utc()
      .toDate();

    const user: User = await prisma.user.create({ data: { ...createBody } });
    return { user, OTP_CODE };
  }

  async loginUser(loginPayload: User, next: NextFunction) {
    const _userExists: User = await prisma.user.findUnique({
      where: { email: loginPayload.email },
    });

    if (
      !_userExists ||
      !(await this.encryptionService.comparePassword(
        _userExists.password,
        loginPayload.password
      ))
    )
      next(new AppException(`Oops!, Incorrect email or password`, 401));

    if (_userExists.isEmailVerified !== true)
      next(
        new AppException(
          'Oops! email address is not verified',
          httpStatus.FORBIDDEN
        )
      );

    const accessToken = await this.tokenService._generateAccessToken(
      _userExists.id,
      _userExists.fullName
    );
    const refreshToken = await this.tokenService._generateRefreshToken(
      _userExists.id,
      _userExists.fullName
    );

    return { accessToken, refreshToken, user: _userExists };
  }

  async regenerateAccessToken(
    refreshToken: string,
    next: NextFunction
  ): Promise<string> {
    const decodeToken = await new TokenService().verifyToken(
      refreshToken,
      next
    );
    const { sub }: any = decodeToken;
    const user = await prisma.user.findById({ _id: sub });

    if (!user)
      next(
        new AppException('Oops!, user does not exist', httpStatus.NOT_FOUND)
      );

    return await this.tokenService._generateAccessToken(
      user.id,
      user.firstName
    );
  }

  async resendOtp({
    req,
    next,
  }: {
    req: User;
    next: NextFunction;
  }): Promise<string> {
    const _user: User = await prisma.user.findOne({
      email: req.email,
      deletedAt: null,
    });
    if (!_user)
      next(
        new AppException('Oops!, user does not exist', httpStatus.NOT_FOUND)
      );

    const OTP_CODE = HelperClass.generateRandomChar(6, 'num');
    if (_user.isEmailVerified === true) {
      next(
        new AppException(
          'Oops!, email is already verified',
          httpStatus.FORBIDDEN
        )
      );
    } else {
      const hashedOtp = this.encryptionService.hashString(OTP_CODE);

      await prisma.user.update({
        where: { id: Number(_user.id) },
        data: {
          emailVerificationToken: hashedOtp,
          emailVerificationTokenExpiry: moment()
            .add('6', 'hours')
            .utc()
            .toDate(),
        },
      });

      // await this.emailService._sendUserEmailVerificationEmail(
      //   _user.firstName,
      //   _user.email,
      //   OTP_CODE
      // );
    }
    return OTP_CODE;
  }
}
// 7ff4f4140a803e84097216ff0b8e6ca080ecb3d4
// bf08317363a41c2d562c01d2b9c427c87ab61019
