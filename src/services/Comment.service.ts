import { PostComment } from '@prisma/client';
import prisma from '../database/model.module';

export default class CommentService {
  async getAllComments(filter: unknown) {
    const data = await prisma.postComment.findMany({ where: filter });
    return data;
  }

  async getCommentById(id: string) {
    const filter: { id: string; deleted_at: null } = { id, deleted_at: null };
    const data = await prisma.postComment.findUnique({ where: { ...filter } });
    return data;
  }

  async createComment(comment: PostComment) {
    const data = await prisma.postComment.create({ data: comment });
    return data;
  }
}
