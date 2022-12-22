import prisma from '../database/model.module';
import { Post } from '@prisma/client';
import paginate from '../utils/paginate';
export default class SocialService {
  async getAllPost(
    filter: Object | any,
    options: any = {},
    ignorePagination = false,
  ): Promise<Post[]> {
    filter.deleted_at = null;

    const data = ignorePagination
      ? await prisma.post.findMany({ where: { user_id: filter.user } })
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
}
