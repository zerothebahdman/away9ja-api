/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Response } from 'express';
import { RequestType } from '../middlewares/auth.middleware';
import AppException from '../../exceptions/AppException';
import SocialService from '../../services/Social.service';
import httpStatus from 'http-status';
import pick from '../../utils/pick';
import HelperClass from '../../utils/helper';
import { CommentType } from '../../../config/constants';
import {
  ParentChildComment,
  Post,
  PostComment,
  PostLikes,
  User,
} from '@prisma/client';
import UserService from '../../services/User.service';
import sendNotificationToUser from '../../utils/sendNotification';

interface PostObj extends Post {
  user: User;
  post_likes: PostLikes[];
}
export default class SocialController {
  constructor(
    private readonly socialService: SocialService,
    private readonly userService: UserService,
  ) {}
  private async notificationId(filter: { postFeed: boolean; userId?: string }) {
    const whoCanReceiveNotification =
      await this.userService.getUsersWhoCanReceiveNotification(filter);
    const pushNotificationId: string[] = [];
    await Promise.all(
      whoCanReceiveNotification.map(async (user) => {
        // get who can receive notification
        const userThatCanReceiveNotification =
          await this.userService.getUserById(user.userId);
        if (userThatCanReceiveNotification.pushNotificationId) {
          pushNotificationId.push(
            userThatCanReceiveNotification.pushNotificationId,
          );
        }
      }),
    );
    return pushNotificationId;
  }
  async createPost(req: RequestType, res: Response, next: NextFunction) {
    try {
      req.body.user_id = req.user.id;
      req.body.isAnonymous === true
        ? (req.body.isApproved = false)
        : (req.body.isApproved = true);

      const post = await this.socialService.createPost(req.body);
      const pushNotificationId = await this.notificationId({ postFeed: true });
      await sendNotificationToUser(
        pushNotificationId,
        `${req.user.fullName} has a new gist for you`,
        `${post.body.length > 50 ? post.body.slice(0, 50) : post.body}`,
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
      let subCommentOwnerPushNotificationId;
      let subComment;
      if (req.body.type === CommentType.SUB_COMMENT) {
        const subCommentBody: Pick<
          ParentChildComment,
          'parent_post_comment_id' | 'child_post_comment_id'
        > = {
          parent_post_comment_id: parentComment,
          child_post_comment_id: comment?.id,
        };
        await this.socialService.createSubComment(subCommentBody);
        subComment = await this.socialService.getCommentById(parentComment);

        const subCommentOwner = await this.userService.getUserById(
          subComment.user_id,
        );
        subCommentOwnerPushNotificationId = await this.notificationId({
          postFeed: true,
          userId: subCommentOwner.id,
        });
      }
      const ownerPost = await this.socialService.queryPostDetailsById(
        req.body.post_id,
      );
      const postOwner = await this.userService.getUserById(ownerPost.user_id);
      const postOwnerPushNotificationId = await this.notificationId({
        postFeed: true,
        userId: postOwner.id,
      });
      await sendNotificationToUser(
        req.body.type === CommentType.SUB_COMMENT
          ? subCommentOwnerPushNotificationId
          : postOwnerPushNotificationId,
        `${
          req.body.type === CommentType.SUB_COMMENT
            ? `${req.user.fullName} made a reply to your comment`
            : `${req.user.fullName} made a comment on your gist`
        }`,
        `${
          req.body.type === CommentType.SUB_COMMENT
            ? subComment.body.length > 50
              ? subComment.body.slice(0, 50)
              : subComment.body
            : ownerPost.body.length > 50
            ? ownerPost.body.slice(0, 50)
            : ownerPost.body
        }`,
      );

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
      const filter = pick(req.query, ['user_id', 'post_category_id']);
      Object.assign(filter, { isApproved: true });
      const options = pick(req.query, ['limit', 'page', 'populate', 'orderBy']);
      const posts = await this.socialService.getAllPost(filter, options);
      const newData = posts as {
        likesCount: number;
        commentsCount: number;
        results: PostObj[];
        page: number;
        limit: number;
        totalPages: number;
        total: number;
      };
      await Promise.all(
        newData.results.map(async (post: PostObj) => {
          if (post.isAnonymous === true) {
            post.user_id = 'anonymous';
            delete post?.user;
            const user = {
              username: `user${HelperClass.generateRandomChar(4, 'num')}`,
              profile_image: null as null,
              fullName: 'Anonymous',
            };
            Object.assign(post, { user });
          }
          const hasActorLiked = post.post_likes.some(
            (like) => like.user_id === req.user.id,
          );
          await Promise.all(
            post.post_likes.map(async (like) => {
              const user = await this.userService.getUserById(like.user_id);
              like.user_id = user as any;
            }),
          );
          const stats = {
            commentsCount: await this.socialService.getPostCommentsCount({
              post_id: post.id,
            }),
            likesCount: await this.socialService.getPostLikesCount({
              post_id: post.id,
            }),
          };
          Object.assign(post, { stats, hasActorLiked });
        }),
      );
      return res.status(httpStatus.ACCEPTED).json({
        status: 'success',
        posts: newData,
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

  async getAnonymousPost(req: RequestType, res: Response, next: NextFunction) {
    try {
      const filter = pick(req.query, ['user_id']);
      Object.assign(filter, { isAnonymous: true, isApproved: false });
      const options = pick(req.query, ['limit', 'page', 'populate', 'orderBy']);
      const posts = await this.socialService.getAnonymousPost(filter, options);
      const newData = posts as {
        likesCount: number;
        commentsCount: number;
        results: PostObj[];
        page: number;
        limit: number;
        totalPages: number;
        total: number;
      };
      await Promise.all(
        newData.results.map((post: PostObj) => {
          if (post.isAnonymous === true) {
            post.user_id = 'anonymous';
            delete post?.user;
            const user = {
              username: `user${HelperClass.generateRandomChar(4, 'num')}`,
              profile_image: null as null,
              fullName: 'John Doe',
            };
            Object.assign(post, { user });
          }
        }),
      );
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

  async approveAnonymousPost(
    req: RequestType,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const post_id = req.params.postId.toString();
      const post = await this.socialService.approveAnonymousPost(post_id);
      return res.status(httpStatus.ACCEPTED).json({
        status: 'success',
        message: `The post has been approved`,
        post,
      });
    } catch (err: any) {
      return next(
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST),
      );
    }
  }

  async deleteAnonymousPost(
    req: RequestType,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const post_id = req.params.postId.toString();
      await this.socialService.deleteAnonymousPost(post_id);
      return res.status(httpStatus.NO_CONTENT);
    } catch (err: any) {
      return next(
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST),
      );
    }
  }

  async addPostCategory(req: RequestType, res: Response, next: NextFunction) {
    try {
      const category = await this.socialService.addPostCategory(req.body);
      return res.status(httpStatus.ACCEPTED).json({
        status: 'success',
        message: 'Post Category has been updated with this category',
        category,
      });
    } catch (err: any) {
      return next(
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST),
      );
    }
  }

  async getAllPostCategory(
    req: RequestType,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const filter = pick(req.query, ['user_id']);
      const options = pick(req.query, ['limit', 'page', 'populate', 'orderBy']);
      const postCategories = await this.socialService.getAllPostCategory(
        filter,
        options,
      );
      return res.status(httpStatus.ACCEPTED).json({
        status: 'success',
        postCategories,
      });
    } catch (err: any) {
      return next(
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST),
      );
    }
  }

  async flagPost(req: RequestType, res: Response, next: NextFunction) {
    try {
      req.body.user_id = req.user.id;
      await this.socialService.flagPost(req.body);
      return res.status(httpStatus.ACCEPTED).json({
        status: 'success',
        message: `Thanks for flagging this post`,
      });
    } catch (err: any) {
      return next(
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST),
      );
    }
  }

  async getFlaggedPost(req: RequestType, res: Response, next: NextFunction) {
    try {
      const filter = pick(req.query, ['user_id']);
      const options = pick(req.query, ['limit', 'page', 'populate', 'orderBy']);
      const posts = await this.socialService.getFlaggedPost(filter, options);
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
}
