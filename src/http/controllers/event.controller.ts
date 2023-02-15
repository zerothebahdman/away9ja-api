/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import EventService from '../../services/Event.service';
import httpStatus from 'http-status';
import pick from '../../utils/pick';
import AppException from '../../exceptions/AppException';
import { RequestType } from '../middlewares/auth.middleware';
import moment from 'moment';
import UserService from '../../services/User.service';
import sendNotificationToUser from '../../utils/sendNotification';

export default class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly userService: UserService,
  ) {}

  async getEvents(req: Request, res: Response, next: NextFunction) {
    try {
      try {
        const filter = pick(req.query, ['user_id']);
        const options = pick(req.query, [
          'limit',
          'page',
          'populate',
          'orderBy',
        ]);
        const events = await this.eventService.getEvents(filter, options);
        return res.status(httpStatus.ACCEPTED).json({
          status: 'success',
          events,
        });
      } catch (err: any) {
        return next(
          new AppException(err.message, err.status || httpStatus.BAD_REQUEST),
        );
      }
    } catch (error) {
      next(error);
    }
  }

  async getEvent(req: RequestType, res: Response, next: NextFunction) {
    try {
      const event = await this.eventService.getEventById(req.params.eventId);
      return res.status(httpStatus.ACCEPTED).json({
        status: 'success',
        event,
      });
    } catch (err: any) {
      return next(
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST),
      );
    }
  }

  async createEvent(req: RequestType, res: Response, next: NextFunction) {
    try {
      req.body.user_id = req.user.id;
      req.body.date = moment(req.body.date).format('YYYY-MM-DD').toString();
      req.body.time = moment(req.body.time, 'HH:mm').format('h:mm A');
      const event = await this.eventService.createEvent(req.body);
      const whoCanReceiveNotification =
        await this.userService.getUsersWhoCanReceiveNotification({
          events: true,
        });
      const pushNotificationId: string[] = [];
      const promise = whoCanReceiveNotification.map(async (user) => {
        // get who can receive notification
        const userThatCanReceiveNotification =
          await this.userService.getUserById(user.userId);
        if (userThatCanReceiveNotification.pushNotificationId) {
          pushNotificationId.push(
            userThatCanReceiveNotification.pushNotificationId,
          );
        }
      });
      await Promise.all(promise);
      await sendNotificationToUser(
        pushNotificationId,
        `New Event`,
        `New Event has been created`,
      );
      return res.status(httpStatus.ACCEPTED).json({
        status: 'success',
        message: `Event has been created`,
        event,
      });
    } catch (err: any) {
      return next(
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST),
      );
    }
  }

  async updateEvent(req: RequestType, res: Response, next: NextFunction) {
    try {
      const event = await this.eventService.updateEventById(
        req.params.eventId,
        req.body,
      );
      return res.status(httpStatus.ACCEPTED).json({
        status: 'success',
        message: `Event has been updated`,
        event,
      });
    } catch (err: any) {
      return next(
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST),
      );
    }
  }

  async deleteEvent(req: RequestType, res: Response, next: NextFunction) {
    try {
      await this.eventService.deleteEventById(req.params.eventId);
      return res.status(httpStatus.NO_CONTENT).send();
    } catch (err: any) {
      return next(
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST),
      );
    }
  }
}
