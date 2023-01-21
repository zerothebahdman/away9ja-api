import prisma from '../database/model.module';
import { Post, ParentChildComment, PostComment, User } from '@prisma/client';
import paginate from '../utils/paginate';
import { CommentType } from '../../config/constants';
import HelperClass from '../utils/helper';

interface PostObj extends Post {
  user: User;
}
export default class SocialService {
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
      Object.assign(filter, { deleted_at: null });
    }

    const data = ignorePagination
      ? await prisma.post.findMany({ where: { user_id: filter.user_id } })
      : ((await paginate<Post, typeof prisma.post>(
          filter,
          options,
          prisma.post,
        )) as {
          results: Post[];
          page: number;
          limit: number;
          totalPages: number;
          total: number;
        });
    const newData = data as {
      results: PostObj[];
      page: number;
      limit: number;
      totalPages: number;
      total: number;
    };
    newData.results.forEach((post: PostObj) => {
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
    });
    return newData;
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
}
