import { Post_Comment } from '@prisma/client';
import prisma from '../database/model.module';

export default class CommentService {
  async getAllComments(filter: unknown){
    const data = await prisma.comment.findMany({ where: filter });
    return data;
  }

  async getCommentById(id: string) {
    const filter: { id: string; deletedAt: null } = { id, deletedAt: null };
    const data = await prisma.comment.findUnique({ where: { ...filter } });
    return data;
  }

  async createComment(comment: Post_Comment){
    const data = await prisma.comment.create({ data: comment });
    return data;
  }
}
