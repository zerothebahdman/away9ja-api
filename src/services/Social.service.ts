import prisma from '../database/model.module';
import {
  Post,
  ParentChildComment,
  PostComment,
  PostLikes,
  PostCategories,
  ReportPost,
} from '@prisma/client';
import paginate from '../utils/paginate';
import { CommentType } from '../../config/constants';
import UserService from './User.service';
import sendNotificationToUser from '../utils/sendNotification';
export default class SocialService {
  constructor(private readonly userService: UserService) {}
  async getAllPost(
    filter: Partial<Post>,
    options: {
      orderBy?: string;
      page?: string;
      limit?: string;
      populate?: string;
    } = {},
    ignorePagination = false,
  ): Promise<
    | Post[]
    | {
        results: Post[];
        page: number;
        limit: number;
        totalPages: number;
        total: number;
      }
  > {
    if (typeof filter === 'object' && filter !== null) {
      Object.assign(filter, { deleted_at: null, isPostFlagged: false });
    }

    const data = ignorePagination
      ? await prisma.post.findMany({ where: { user_id: filter.user_id } })
      : await paginate<Post, typeof prisma.post>(filter, options, prisma.post);
    return data;
  }
  async createPost(createBody: Post): Promise<Post> {
    const post: Post = await prisma.post.create({
      data: { ...createBody },
    });
    return post;
  }
  async updateUserPostById(id: string, updateBody: Post): Promise<Post> {
    const post = await prisma.post.update({
      where: { id },
      data: { ...updateBody },
    });
    return post;
  }

  async deleteUserPostById(id: string): Promise<Post> {
    const post = await prisma.post.delete({
      where: { id },
    });

    return post;
  }

  async createComment(createBody: Post): Promise<PostComment> {
    const comment: PostComment = await prisma.postComment.create({
      data: { ...createBody },
    });
    return comment;
  }

  async createSubComment(
    createBody: Partial<ParentChildComment>,
  ): Promise<ParentChildComment> {
    const comment: ParentChildComment = await prisma.parentChildComment.create({
      data: { ...createBody },
    });
    return comment;
  }

  async getPostComments(
    filter: { type?: CommentType; post_id: string } | qs.ParsedQs,
  ) {
    if (typeof filter === 'object' && filter !== null) {
      Object.assign(filter, { deleted_at: null });
    }
    const data = await prisma.postComment.findMany({
      where: {
        ...filter,
      },
      include: {
        user: true,
      },
    });
    return data;
  }

  async getSubComments(filter: Partial<ParentChildComment>) {
    if (typeof filter === 'object' && filter !== null) {
      Object.assign(filter, { deleted_at: null });
    }
    const data = await prisma.parentChildComment.findMany({
      where: { ...filter },
    });
    return data;
  }

  async getCommentById(id: string) {
    const data = await prisma.postComment.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });

    return data;
  }

  async likePost(data: Partial<PostLikes>): Promise<{ message: string }> {
    const { user_id, post_id } = data;
    const like = await prisma.postLikes.findFirst({
      where: { user_id, post_id },
    });

    if (like) {
      await prisma.postLikes.delete({
        where: { id: like.id },
      });
      return { message: 'Post unliked' };
    }
    await prisma.postLikes.create({
      data: { user_id, post_id },
    });
    const user = await prisma.user.findUnique({
      where: { id: user_id },
    });
    const ownerOfPost = await prisma.post.findUnique({
      where: { id: post_id },
    });
    const whoCanReceiveNotification =
      await this.userService.getUsersWhoCanReceiveNotification({
        postFeed: true,
        userId: ownerOfPost.user_id,
      });
    const pushNotificationId: string[] = [];
    const promise = whoCanReceiveNotification.map(async (user) => {
      // get who can receive notification
      const userThatCanReceiveNotification = await this.userService.getUserById(
        user.userId,
      );
      if (userThatCanReceiveNotification.pushNotificationId) {
        pushNotificationId.push(
          userThatCanReceiveNotification.pushNotificationId,
        );
      }
    });
    await Promise.all(promise);
    await sendNotificationToUser(
      pushNotificationId,
      `Post liked`,
      `${user.username} liked your post`,
    );
    return { message: 'Post liked' };
  }

  async getPostLikesCount(filter: Partial<PostLikes>) {
    const data = await prisma.postLikes.count({
      where: { ...filter },
    });
    return data;
  }

  async getPostCommentsCount(filter: Partial<PostComment>) {
    const data = await prisma.postComment.count({
      where: { ...filter },
    });
    return data;
  }

  async getPostLikes(filter: Partial<PostLikes>) {
    const data = await prisma.postLikes.findMany({
      where: { ...filter },
    });
    return data;
  }

  async getAnonymousPost(
    filter: Partial<Post>,
    options: {
      orderBy?: string;
      page?: string;
      limit?: string;
      populate?: string;
    } = {},
    ignorePagination = false,
  ): Promise<
    | Post[]
    | {
        results: Post[];
        page: number;
        limit: number;
        totalPages: number;
        total: number;
      }
  > {
    if (typeof filter === 'object' && filter !== null) {
      Object.assign(filter, { deleted_at: null });
    }
    const data = ignorePagination
      ? await prisma.post.findMany({ where: { user_id: filter.user_id } })
      : await paginate<Post, typeof prisma.post>(filter, options, prisma.post);

    return data;
  }

  async approveAnonymousPost(id: string): Promise<Post> {
    const post = await prisma.post.update({
      where: { id },
      data: { isApproved: true },
    });
    return post;
  }

  async deleteAnonymousPost(id: string): Promise<void> {
    await prisma.post.delete({
      where: { id },
    });
  }

  async addPostCategory(createBody: PostCategories) {
    const category = await prisma.postCategories.create({
      data: { ...createBody },
    });

    return category;
  }

  async getAllPostCategory(
    filter: Partial<PostCategories>,
    options: {
      orderBy?: string;
      page?: string;
      limit?: string;
      populate?: string;
    } = {},
    ignorePagination = false,
  ): Promise<
    | PostCategories[]
    | {
        results: PostCategories[];
        page: number;
        limit: number;
        totalPages: number;
        total: number;
      }
  > {
    if (typeof filter === 'object' && filter !== null) {
      Object.assign(filter, { deleted_at: null });
    }

    const data = ignorePagination
      ? await prisma.postCategories.findMany()
      : await paginate<PostCategories, typeof prisma.postCategories>(
          filter,
          options,
          prisma.postCategories,
        );
    return data;
  }

  async flagPost(data: Partial<ReportPost>): Promise<{ message: string }> {
    const { user_id, post_id, reason, description } = data;
    const flag = await prisma.reportPost.findFirst({
      where: { user_id, post_id },
    });

    if (flag) {
      await prisma.reportPost.delete({
        where: { id: flag.id },
      });
      return { message: 'Post unflagged' };
    }
    await prisma.reportPost.create({
      data: { user_id, post_id, reason, description },
    });
    return { message: 'Post flagged' };
  }

  async getFlaggedPost(
    filter: Partial<ReportPost>,
    options: {
      orderBy?: string;
      page?: string;
      limit?: string;
      populate?: string;
    } = {},
    ignorePagination = false,
  ): Promise<
    | ReportPost[]
    | {
        results: ReportPost[];
        page: number;
        limit: number;
        totalPages: number;
        total: number;
      }
  > {
    if (typeof filter === 'object' && filter !== null) {
      Object.assign(filter, { deleted_at: null });
    }

    const data = ignorePagination
      ? await prisma.reportPost.findMany({ where: filter })
      : await paginate<ReportPost, typeof prisma.reportPost>(
          filter,
          options,
          prisma.reportPost,
        );
    return data;
  }
}
