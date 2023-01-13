import { Router, Request, Response, NextFunction } from 'express';
import { isUserAuthenticated } from '../../middlewares/auth.middleware';
import { eventController } from '../../controllers/controllers.module';
import validate from '../../middlewares/validate';
import {
  createEventValidator,
  deleteEventValidator,
  updateEventValidator,
} from '../../../validators/Event.validator';

const route = Router();

route
  .route('/')
  .get(
    isUserAuthenticated,
    (req: Request, res: Response, next: NextFunction) => {
      eventController.getEvents(req, res, next);
    },
  )
  .post(
    isUserAuthenticated,
    validate(createEventValidator),
    (req: Request, res: Response, next: NextFunction) => {
      eventController.createEvent(req, res, next);
    },
  );

route
  .route('/:eventId')
  .get(
    isUserAuthenticated,
    validate(deleteEventValidator),
    (req: Request, res: Response, next: NextFunction) => {
      eventController.getEvent(req, res, next);
    },
  )
  .patch(
    isUserAuthenticated,
    validate(updateEventValidator),
    (req, res, next) => {
      eventController.updateEvent(req, res, next);
    },
  )
  .delete(isUserAuthenticated, (req, res, next) => {
    eventController.deleteEvent(req, res, next);
  });

export default route;
