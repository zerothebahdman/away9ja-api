/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Response } from 'express';
import { RequestType } from '../middlewares/auth.middleware';
import AppException from '../../exceptions/AppException';
import NewbieCornerService from '../../services/NewbieCorner.service';
import httpStatus from 'http-status';
import pick from '../../utils/pick';

export default class NewbieCornerController {
  constructor(private readonly newbieCornerService: NewbieCornerService) {}

  async addNewbieTag(req: RequestType, res: Response, next: NextFunction) {
    try {
      const newbieTag = await this.newbieCornerService.addNewbieTag(req.body);
      return res.status(httpStatus.ACCEPTED).json({
        status: 'success',
        message: 'Newbie Tag has been updated with this tag',
        newbieTag,
      });
    } catch (err: any) {
      return next(
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST),
      );
    }
  }
  async getAllNewbieTag(req: RequestType, res: Response, next: NextFunction) {
    try {
      const filter = pick(req.query, ['user_id']);
      const options = pick(req.query, ['limit', 'page', 'populate', 'orderBy']);
      const newbieTags = await this.newbieCornerService.getAllNewbieTag(
        filter,
        options,
      );
      return res.status(httpStatus.ACCEPTED).json({
        status: 'success',
        newbieTags,
      });
    } catch (err: any) {
      return next(
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST),
      );
    }
  }
  async createNewbieArticle(
    req: RequestType,
    res: Response,
    next: NextFunction,
  ) {
    try {
      //convert list of ID from the request body to list of objects
      function convertStringsToListOfObjects(
        listOfStrings: string[],
        keyName: string,
      ): { [key: string]: string }[] {
        const listOfObjects = listOfStrings.map((str: string) => {
          const newObj: { [key: string]: string } = {};
          newObj[keyName] = str;
          return newObj;
        });
        return listOfObjects;
      }

      const listOfTag = convertStringsToListOfObjects(
        req.body.newbieTag,
        'name',
      );

      const newbieArticle = {
        user_id: req.user.id,
        ...req.body,
        newbieTag: {
          create: listOfTag,
        },
      };

      const newbieCornerArticle =
        await this.newbieCornerService.createNewbieArticle(newbieArticle);
      return res.status(httpStatus.ACCEPTED).json({
        status: 'success',
        message: `Newbie Corner has been Updated with your Article`,
        newbieCornerArticle,
      });
    } catch (err: any) {
      return next(
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST),
      );
    }
  }
  async getNewbieArticleById(
    req: RequestType,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const filter = { id: req.params.articleId };
      const options = pick(req.query, ['limit', 'page', 'populate', 'orderBy']);
      const newbieArticle = await this.newbieCornerService.getNewbieArticleById(
        req.params.articleId,
        filter,
        options,
      );
      return res.status(httpStatus.ACCEPTED).json({
        status: 'success',
        newbieArticle,
      });
    } catch (err: any) {
      return next(
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST),
      );
    }
  }
  async getAllNewbieArticle(
    req: RequestType,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const filter = pick(req.query, ['user_id']);
      const options = pick(req.query, ['limit', 'page', 'populate', 'orderBy']);
      const allArticles = await this.newbieCornerService.getAllNewbieArticle(
        filter,
        options,
      );
      return res.status(httpStatus.ACCEPTED).json({
        status: 'success',
        allArticles,
      });
    } catch (err: any) {
      return next(
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST),
      );
    }
  }
}
