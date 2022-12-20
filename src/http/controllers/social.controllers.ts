import { NextFunction, Response } from 'express';
import { RequestType } from '../middlewares/auth.middleware';
import AppException from '../../exceptions/AppException';
import SocialService from '../../services/Social.service';
import httpStatus from 'http-status';
import pick from '../../utils/pick';

export default class SocialController {
  constructor(private readonly socialService: SocialService) {}

  async createPost(
    req: RequestType,
    res: Response,
    next: NextFunction
  ): Promise<void | Response<any, Record<string, any>>> {
    try {
      const feed = { user_id: req.user.id, ...req.body };
      const { post } = await this.socialService.createPost(feed);
      return res.status(httpStatus.ACCEPTED).json({
        status: 'success',
        message: `Your feeds has been Updated`,
        post,
      });
    } catch (err: any) {
      return next(
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST)
      );
    }
  }

  async getAllPost(
    req: RequestType,
    res: Response,
    next: NextFunction
  ): Promise<void | Response<any, Record<string, any>>> {
    try {
      const filter = pick(req.query, ['sortBy', 'user']);
      const options = pick(req.query, ['limit', 'page', 'populate']);
      const posts = await this.socialService.getAllPost(filter, options);
      return res.status(httpStatus.ACCEPTED).json({
        status: 'success',
        posts,
      });
    } catch (err: any) {
      return next(
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST)
      );
    }
  }

  async editPost(
    req: RequestType,
    res: Response,
    next: NextFunction
  ): Promise<void | Response<any, Record<string, any>>> {
    try {
      const post_id = req.query.id.toString();

      const feed = {
        user_id: req.user.id,
        ...req.body,
      };
      const { post } = await this.socialService.updateUserPostById(
        post_id,
        feed
      );
      return res.status(httpStatus.ACCEPTED).json({
        status: 'success',
        message: `Your feeds has been Updated`,
        post,
      });
    } catch (err: any) {
      return next(
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST)
      );
    }
  }

  async deletePost(
    req: RequestType,
    res: Response,
    next: NextFunction
  ): Promise<void | Response<any, Record<string, any>>> {
    try {
      const post_id = req.query.id.toString();
      const { post } = await this.socialService.deleteUserPostById(post_id);
      return res.status(httpStatus.ACCEPTED).json({
        status: 'success',
        message: `This feed has been deleted`,
        post,
      });
    } catch (err: any) {
      return next(
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST)
      );
    }
  }
}
