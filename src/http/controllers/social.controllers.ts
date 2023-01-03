import { NextFunction, Response } from 'express';
import { RequestType } from '../middlewares/auth.middleware';
import AppException from '../../exceptions/AppException';
import SocialService from '../../services/Social.service';
import httpStatus from 'http-status';
import pick from '../../utils/pick';
import HelperClass from '../../utils/helper';

export default class SocialController {
  constructor(private readonly socialService: SocialService) {}

  async createPost(req: RequestType, res: Response, next: NextFunction) {
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
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST),
      );
    }
  }

  async createComment(req: RequestType, res: Response, next: NextFunction) {
    try {
      delete req.body.type;

      const commentBody = { user_id: req.user.id, ...req.body };
      const comment = await this.socialService.createComment(commentBody);
      // if (req.body.type === 'sub_comment') {
      //   const subCommentBody = {
      //     child_post_comment_id: comment.id,
      //     parent_post_comment_id: req.body.parent_post_comment_id as string,
      //   };
      //   await this.socialService.createSubComment(subCommentBody);
      // }
      return res.status(httpStatus.ACCEPTED).json({
        status: 'success',
        comment: HelperClass.removeUnwantedProperties(comment, ['deleted_at']),
      });
    } catch (err: any) {
      return next(
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST),
      );
    }
  }

  async getPostComment(req: RequestType, res: Response, next: NextFunction) {
    try {
      const comments = await this.socialService.getPostComments(
        req.params.post_id,
      );
      return res.status(httpStatus.ACCEPTED).json({
        status: 'success',
        comments,
      });
    } catch (err: any) {
      return next(
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST),
      );
    }
  }

  async getAllPost(req: RequestType, res: Response, next: NextFunction) {
    try {
      const filter = pick(req.query, ['user_id']);
      const options = pick(req.query, ['limit', 'page', 'populate', 'orderBy']);
      const posts = await this.socialService.getAllPost(filter, options);
      return res.status(httpStatus.ACCEPTED).json({
        status: 'success',
        posts,
      });
    } catch (err: any) {
      return next(
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST),
      );
    }
  }

  async editPost(req: RequestType, res: Response, next: NextFunction) {
    try {
      const post_id = req.query.id.toString();

      const feed = {
        user_id: req.user.id,
        ...req.body,
      };
      const { post } = await this.socialService.updateUserPostById(
        post_id,
        feed,
      );
      return res.status(httpStatus.ACCEPTED).json({
        status: 'success',
        message: `Your feeds has been Updated`,
        post,
      });
    } catch (err: any) {
      return next(
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST),
      );
    }
  }

  async deletePost(
    req: RequestType,
    res: Response,
    next: NextFunction,
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
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST),
      );
    }
  }
}
