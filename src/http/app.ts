/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import enforce from 'express-sslify';
import router from './router/v1/router.module';
import {
  ErrorHandler,
  ErrorConverter,
} from './middlewares/error_handler.middleware';
import morgan from 'morgan';
import Sentry from '@sentry/node';
import Tracing from '@sentry/tracing';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import AppException from '../exceptions/AppException';
import httpStatus from 'http-status';
import config from '../../config/default';

const app: Application = express();

interface MiddlewareError extends Error {
  status?: number | string;
  statusCode?: number | string;
  status_code?: number | string;
  output?: {
    statusCode?: number | string;
  };
}

if (config.sentry.enabled) {
  Sentry.init({
    dsn: config.sentry.dsn,
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // enable Express.js middleware tracing
      new Tracing.Integrations.Express({ app }),
    ],

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  });

  // RequestHandler creates a separate execution context using domains, so that every
  // transaction/span/breadcrumb is attached to its own Hub instance
  app.use(Sentry.Handlers.requestHandler());
  // TracingHandler creates a trace for every incoming request
  app.use(Sentry.Handlers.tracingHandler());
}

if (config.env === 'production' || config.env === 'staging') {
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
}

if (config.env === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json({ limit: '2MB' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(hpp());
app.use(helmet());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  skipSuccessfulRequests: true,
  message: 'Too many requests from this IP, please try again in an hour!',
});

app.use('/api', limiter);
app.disable('x-powered-by');

app.get('/', (_req, res) => {
  res.send(`<b>Welcome to ${config.appName} App!</b>`);
});

app.use('/api/v1', router);

app.all('*', (req: Request, _res: Response, next: NextFunction) => {
  return next(
    new AppException(
      `Cant find ${req.originalUrl} on the server.`,
      httpStatus.NOT_FOUND,
    ),
  );
});

if (config.sentry.enabled) {
  // The error handler must be before any other error middleware and after all controllers
  app.use(
    Sentry.Handlers.errorHandler({
      shouldHandleError(error: MiddlewareError) {
        // Capture some 40-errors and >= 500 errors
        const CAPTURE_STATUS_CODES = [400, 401];
        if (
          CAPTURE_STATUS_CODES.includes(error.statusCode as number) ||
          (error.statusCode as number) >= 500
        ) {
          return true;
        }
        return false;
      },
    }),
  );

  // Optional fallthrough error handler
  app.use(function onError(_err: Error, _req: Request, res: Response | any) {
    // The error id is attached to `res.sentry` to be returned and optionally displayed to the user for support.
    res.statusCode = 500;
    res.end(`${res.sentry as Response}\n`);
  });
}

app.use(ErrorConverter);
app.use(ErrorHandler);
export default app;
