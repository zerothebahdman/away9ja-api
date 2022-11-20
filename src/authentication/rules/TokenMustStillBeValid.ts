import { NextFunction } from 'express';
import AppException from '../../exceptions/AppException';
import httpStatus from 'http-status';

const TokenMustStillBeValid = (next: NextFunction) => {
  return next(new AppException(`Oops!, invalid token`, httpStatus.BAD_REQUEST));
};

export default TokenMustStillBeValid;
