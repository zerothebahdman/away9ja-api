import prisma from "../database/model.module";
import { Post } from "@prisma/client";
import paginate from "../utils/paginate";
//import { idText } from "typescript";
export default class SocialService {
  async _getAllPost(
    filter: Post,
    id: number,
    options: any = {},
    ignorePagination = false
  ): Promise<Post[]> {
    const data = ignorePagination
      ? await prisma.post.findMany({ where: { id } })
      : await paginate<typeof prisma.post>(filter, options, prisma.post);
    return data;
  }
  async createPost(createBody: Post): Promise<{ post: Post }> {
    const post: Post = await prisma.post.create({
      data: { ...createBody },
    });
    return { post };
  }
}
