import prisma from "../database/model.module";
import { Post } from "@prisma/client";
//import { idText } from "typescript";
export default class SocialService {
  async getAllPost(user_id: number): Promise<Post[]> {
    const data = await prisma.post.findMany({ where: { user_id } });

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
    updateBody: Post
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
