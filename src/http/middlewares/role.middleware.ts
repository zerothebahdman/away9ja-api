import { NextFunction, Response } from 'express';
import AppException from '../../exceptions/AppException';
import { RequestType } from './auth.middleware';
import httpStatus from 'http-status';

export const restrictAccessTo =
  (...roles: string[]) =>
  (req: RequestType, _res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppException(
          `Oops! you don't have the privilege to perform this action`,
          httpStatus.FORBIDDEN,
        ),
      );
    }

    next();
  };
