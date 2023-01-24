import prisma from '../database/model.module';
import {
  marketPlace,
  Categories,
  marketPlaceComment,
  ParentChildComment,
} from '@prisma/client';
import paginate from '../utils/paginate';
import { CommentType } from '../../config/constants';

export default class MarketPlaceService {
  async addMarketItem(createBody: marketPlace) {
    const marketPlaceItem = await prisma.marketPlace.create({
      data: { ...createBody },
    });

    return marketPlaceItem;
  }

  async getAllMyItem(
    filter: Partial<marketPlace>,
    options: {
      orderBy?: string;
      page?: string;
      limit?: string;
      populate?: string;
    } = {},
    ignorePagination = false,
  ): Promise<
    | marketPlace[]
    | {
        results: marketPlace[];
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
      ? await prisma.marketPlace.findMany({
          where: { user_id: filter.user_id },
        })
      : await paginate<marketPlace, typeof prisma.marketPlace>(
          filter,
          options,
          prisma.marketPlace,
        );
    return data;
  }

  async updateMarketItemByItemId(id: string, updateBody: marketPlace) {
    const marketPlaceItem = await prisma.marketPlace.update({
      where: { id },
      data: { ...updateBody },
    });
    return marketPlaceItem;
  }

  async deleteMarketItemByItemId(id: string) {
    await prisma.marketPlace.delete({
      where: { id },
    });
  }

  async listings(
    filter: Partial<marketPlace>,
    options: {
      orderBy?: string;
      page?: string;
      limit?: string;
      populate?: string;
    } = {},
    ignorePagination = false,
  ): Promise<
    | marketPlace[]
    | {
        results: marketPlace[];
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
      ? await prisma.marketPlace.findMany()
      : await paginate<marketPlace, typeof prisma.marketPlace>(
          filter,
          options,
          prisma.marketPlace,
        );
    return data;
  }

  async addCategory(createBody: Categories) {
    const category = await prisma.categories.create({
      data: { ...createBody },
    });

    return category;
  }

  async getAllCategory(
    filter: Partial<Categories>,
    options: {
      orderBy?: string;
      page?: string;
      limit?: string;
      populate?: string;
    } = {},
    ignorePagination = false,
  ): Promise<
    | Categories[]
    | {
        results: Categories[];
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
      ? await prisma.categories.findMany()
      : await paginate<Categories, typeof prisma.categories>(
          filter,
          options,
          prisma.categories,
        );
    return data;
  }

  async createMarketPlaceComment(
    createBody: marketPlaceComment,
  ): Promise<marketPlaceComment> {
    const marketPlaceComment: marketPlaceComment =
      await prisma.marketPlaceComment.create({
        data: { ...createBody },
      });
    return marketPlaceComment;
  }

  async createMarketSubComment(createBody: any): Promise<ParentChildComment> {
    const comment: ParentChildComment = await prisma.parentChildComment.create({
      data: { ...createBody },
    });
    return comment;
  }

  async getMarketPlaceCommentsByAuthor(
    //this is to retrieve comments by a user who posted an Item
    filter: { type?: CommentType; post_id: string } | qs.ParsedQs,
  ) {
    if (typeof filter === 'object' && filter !== null) {
      Object.assign(filter, { deleted_at: null });
    }
    const data = await prisma.marketPlaceComment.findMany({
      where: {
        ...filter,
      },
    });
    return data;
  }

  async getMarketPlaceCommentsByUser(
    //this is to retrieve comments by a user who commented on a posted Item
    filter:
      | { type?: CommentType; post_id: string; user_id: string }
      | qs.ParsedQs,
  ) {
    if (typeof filter === 'object' && filter !== null) {
      Object.assign(filter, { deleted_at: null });
    }
    const data = await prisma.marketPlaceComment.findMany({
      where: {
        ...filter,
      },
    });
    return data;
  }

  async getMarketPlaceSubComments(filter: any) {
    if (typeof filter === 'object' && filter !== null) {
      Object.assign(filter, { deleted_at: null });
    }
    const data = await prisma.parentChildComment.findMany({
      where: { ...filter },
    });
    return data;
  }

  async getMArketPlaceCommentById(id: string) {
    const data = await prisma.marketPlaceComment.findUnique({
      where: { id },
    });
    return data;
  }
}
