/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import type { ErrorRequestHandler } from 'express';
import httpStatus from 'http-status';
import AppException from '../../exceptions/AppException';
import config from '../../../config/default';

export interface Error {
  statusCode: number;
  status: string;
  message: string;
  error?: string;
  stack?: string;
  fullName?: string;
  isOperational?: boolean;
}

function setDevError(err: Error, res: Response) {
  return res.status(err.statusCode).send({
    status: err.status,
    message: err.message,
    error: err,
    error_stack: err.stack,
  });
}

function setProductionError(err: Error, res: Response) {
  return res.status(err.statusCode).send({
    status: err.status,
    message: err.message,
  });
}

export const ErrorConverter = (
  err: any,
  _req: Request,
  _res: Response,
  next: NextFunction,
) => {
  let error = err;
  if (!(error instanceof AppException)) {
    const statusCode = error.statusCode || httpStatus.BAD_REQUEST;
    const message = error.message || httpStatus[statusCode];
    error = new AppException(statusCode, message, err.stack);
  }
  next(error);
};

export const ErrorHandler: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  err.statusCode = err.statusCode || httpStatus.BAD_REQUEST;
  err.status = err.status || 'error';

  if (config.env === 'development') {
    setDevError(err, res);
  } else if (config.env === 'production' || config.env === 'staging') {
    setProductionError(err, res);
  }
  next();
};
