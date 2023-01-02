import prisma from '../database/model.module';
import { Post, ParentChildComment, PostComment } from '@prisma/client';
import paginate from '../utils/paginate';
export default class SocialService {
  async getAllPost(
    filter: typeof Object | unknown | any,
    options: {
      orderBy?: any;
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
        total: any;
      }
  > {
    if (typeof filter === 'object' && filter !== null) {
      Object.assign(filter, { deleted_at: null });
    }

    const data = ignorePagination
      ? await prisma.post.findMany({ where: { user_id: filter.user_id } })
      : await paginate<typeof prisma.post>(filter, options, prisma.post);
    return data;
  }
  async createPost(createBody: Post): Promise<{ post: Post }> {
    const post: Post = await prisma.post.create({
      data: { ...createBody },
    });
    return { post };
  }
  async updateUserPostById(
    id: string,
    updateBody: Post,
  ): Promise<{ post: Post }> {
    const post = await prisma.post.update({
      where: { id },
      data: { ...updateBody },
    });
    return { post };
  }

  async deleteUserPostById(id: string): Promise<{ post: Post }> {
    const post = await prisma.post.delete({
      where: { id },
    });

    return { post };
  }

  async createComment(createBody: Post): Promise<PostComment> {
    const comment: PostComment = await prisma.postComment.create({
      data: { ...createBody },
    });
    return comment;
  }

  async createSubComment(
    createBody: ParentChildComment,
  ): Promise<ParentChildComment> {
    const comment: ParentChildComment = await prisma.parentChildComment.create({
      data: { ...createBody },
    });
    return comment;
  }

  async getPostComments(postId: string) {
    const data = await prisma.postComment.findMany({
      where: { post_id: postId },
    });
    return data;
  }
}
