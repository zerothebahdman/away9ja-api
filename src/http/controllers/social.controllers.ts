/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Response } from 'express';
import { RequestType } from '../middlewares/auth.middleware';
import AppException from '../../exceptions/AppException';
import SocialService from '../../services/Social.service';
import httpStatus from 'http-status';
import pick from '../../utils/pick';
import HelperClass from '../../utils/helper';
import { CommentType } from '../../../config/constants';
import { ParentChildComment, PostComment } from '@prisma/client';

export default class SocialController {
  constructor(private readonly socialService: SocialService) {}

  async createPost(req: RequestType, res: Response, next: NextFunction) {
    try {
      req.body.user_id = req.user.id;
      req.body.isApproved = false;
      const post = await this.socialService.createPost(req.body);
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

  async likePost(req: RequestType, res: Response, next: NextFunction) {
    try {
      const { message } = await this.socialService.likePost({
        user_id: req.user.id,
        post_id: req.params.post_id,
      });
      return res.status(httpStatus.ACCEPTED).json({
        status: 'success',
        message,
      });
    } catch (err: any) {
      return next(
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST),
      );
    }
  }

  async createComment(req: RequestType, res: Response, next: NextFunction) {
    try {
      const parentComment: string = req.body.parent_post_comment_id;
      delete req.body.parent_post_comment_id;
      const commentBody = { user_id: req.user.id, ...req.body };
      const comment = await this.socialService.createComment(commentBody);
      if (req.body.type === CommentType.SUB_COMMENT) {
        const subCommentBody: Pick<
          ParentChildComment,
          'parent_post_comment_id' | 'child_post_comment_id'
        > = {
          parent_post_comment_id: parentComment,
          child_post_comment_id: comment?.id,
        };
        await this.socialService.createSubComment(subCommentBody);
      }
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
      const comments: any = await this.socialService.getPostComments({
        type: req.query.type,
        post_id: req.params.post_id,
      });
      // loop through the comments array using the comment.id check the parent_child_comment table to get the sub comments and add it to the comment object
      // const subCommentsArray: ParentChildComment[] = [];
      // const __subComment: PostComment[] = [];

      // await Promise.all(
      //   comments.map(async (comment: any) => {
      //     // check the parent_child_comment table to get the sub comments and add it to the comment object
      //     const subComments = await this.socialService.getSubComments({
      //       parent_post_comment_id: comment.id,
      //     });
      //     subCommentsArray.push(...subComments);
      //   }),
      // );

      // await Promise.all(
      //   subCommentsArray.map(async (subComment) => {
      //     comments.map(async (comment) => {
      //       console.log({
      //         boolean: comment.id === subComment.parent_post_comment_id,
      //         id: `${comment.id} === ${subComment.parent_post_comment_id}`,
      //       });

      //       if (comment.id === subComment.parent_post_comment_id) {
      //         const _subComment = await this.socialService.getCommentById(
      //           subComment.child_post_comment_id,
      //         );

      //         Object.assign(comment, {
      //           subComments: _subComment,
      //         });
      //         __subComment.push(comment);
      //       }
      //     });
      //   }),
      // );

      // await Promise.all(
      //   subCommentsArray.map(async (subComment) => {
      //     const allCommentsForPost = await this.socialService.getPostComments({
      //       post_id: req.params.post_id,
      //     });
      //     // comments.map(async (comment) => {

      //     //   if (comment.id === subComment.parent_post_comment_id) {
      //     //     const _subComment = await this.socialService.getCommentById(
      //     //       subComment.child_post_comment_id,
      //     //     );

      //     //     // if (comments[commentIndex].type === CommentType.MAIN_COMMENT) {
      //     //     Object.assign(comment, {
      //     //       subComments: _subComment,
      //     //     });
      //     //     __subComment.push(comment);
      //     //     // console.log(__subComment);
      //     //   }
      //     //   return comment;
      //     // });
      //     const commentIndex = allCommentsForPost.findIndex((comment) => {
      //       return comment.id === subComment.parent_post_comment_id;
      //     });
      //     // console.log(comments, commentIndex);

      //     if (commentIndex !== -1) {
      //       const _subComment = await this.socialService.getCommentById(
      //         subComment.child_post_comment_id,
      //       );
      //       const a = {
      //         parentComment: subComment.parent_post_comment_id,
      //       };
      //       Object.assign(_subComment, a);
      //       subComment.child_post_comment_id = _subComment.id;
      //       __subComment.push(_subComment);

      //       if (comments[commentIndex].type === CommentType.MAIN_COMMENT) {
      //         Object.assign(comments[commentIndex], {
      //           subComments: __subComment,
      //         });

      //         // check the subComments array in the comment object, check the id in the comment object if it does not match the parentComment in the subComments array then remove it from the subComments array
      //         const subComments = comments[commentIndex].subComments;
      //         const subCommentsIndex = subComments.findIndex(
      //           (subComment: any) => {
      //             console.log(subComment);

      //             return subComment.parentComment !== comments[commentIndex].id;
      //           },
      //         );

      //         // console.log(subCommentsIndex);

      //         if (subCommentsIndex !== -1) {
      //           subComments.splice(subCommentsIndex, 1);
      //         }
      //       }
      //     }
      //   }),
      // );

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

  async getSubComment(req: RequestType, res: Response, next: NextFunction) {
    try {
      const subCommentsIds = await this.socialService.getSubComments({
        parent_post_comment_id: req.params.comment_id,
      });
      const subComments: PostComment[] = [];
      await Promise.all(
        subCommentsIds.map(async (subComment) => {
          const _subComment = await this.socialService.getCommentById(
            subComment.child_post_comment_id,
          );
          subComments.push(_subComment);
        }),
      );
      return res.status(httpStatus.ACCEPTED).json({
        status: 'success',
        subComments,
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
      Object.assign(filter, { isApproved: true });
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
      const post = await this.socialService.updateUserPostById(post_id, feed);
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
      const post = await this.socialService.deleteUserPostById(post_id);
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
