import prisma from '../database/model.module';
import { NewbieCorner, NewbieTag } from '@prisma/client';
import paginate from '../utils/paginate';
//import HelperClass from '../utils/helper';

export default class NewbieCornerService {
  async addNewbieTag(createBody: NewbieTag) {
    const newbieTag = await prisma.newbieTag.create({
      data: { ...createBody },
    });
    return newbieTag;
  }
  async getAllNewbieTag(
    filter: Partial<NewbieTag>,
    options: {
      orderBy?: string;
      page?: string;
      limit?: string;
      populate?: string;
    } = {},
    ignorePagination = false,
  ): Promise<
    | NewbieTag[]
    | {
        results: NewbieTag[];
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
      ? await prisma.newbieTag.findMany()
      : await paginate<NewbieTag, typeof prisma.newbieTag>(
          filter,
          options,
          prisma.newbieTag,
        );
    return data;
  }
  async createNewbieArticle(createBody: NewbieCorner): Promise<NewbieCorner> {
    const newbieCornerArticle: NewbieCorner = await prisma.newbieCorner.create({
      data: { ...createBody },
    });
    return newbieCornerArticle;
  }
  async getAllNewbieArticle(
    filter: Partial<NewbieCorner>,
    options: {
      orderBy?: string;
      page?: string;
      limit?: string;
      populate?: string;
    } = {},
    ignorePagination = false,
  ): Promise<
    | NewbieCorner[]
    | {
        results: NewbieCorner[];
        page: number;
        limit: number;
        totalPages: number;
        total: string;
      }
  > {
    if (typeof filter === 'object' && filter !== null) {
      Object.assign(filter, { deleted_at: null });
    }

    const data = ignorePagination
      ? await prisma.newbieCorner.findMany()
      : await paginate<NewbieCorner, typeof prisma.newbieCorner>(
          filter,
          options,
          prisma.newbieCorner,
        );
    return data;
  }
  async getNewbieArticleById(
    id: string,
    filter?: Partial<NewbieCorner>,
    options: {
      orderBy?: string;
      page?: string;
      limit?: string;
      populate?: string;
    } = {},
    ignorePagination = false,
  ): Promise<
    | NewbieCorner
    | {
        results: NewbieCorner[];
        page: number;
        limit: number;
        totalPages: number;
        total: string;
      }
  > {
    const data = ignorePagination
      ? await prisma.newbieCorner.findUnique({ where: { id } })
      : await paginate<NewbieCorner, typeof prisma.newbieCorner>(
          filter,
          options,
          prisma.newbieCorner,
        );
    return data;
  }
  async updateNewbieArticleById(
    id: string,
    updateBody: NewbieCorner,
  ): Promise<NewbieCorner> {
    const newbieCornerArticle = await prisma.newbieCorner.update({
      where: { id },
      data: { ...updateBody },
      include: { newbieTag: true },
    });
    return newbieCornerArticle;
  }
  async deleteNewbieArticleById(id: string) {
    await prisma.newbieCorner.delete({
      where: { id },
    });
  }
}
