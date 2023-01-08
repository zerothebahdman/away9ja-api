import prisma from '../database/model.module';
import { marketPlace, Categories } from '@prisma/client';
import paginate from '../utils/paginate';

export default class MarketService {
  async addMarketItem(createBody: marketPlace): Promise<{ Item: marketPlace }> {
    const Item: marketPlace = await prisma.marketPlace.create({
      data: { ...createBody },
    });

    return { Item };
  }

  async getAllMyItem(
    filter: typeof Object | unknown | any,
    options: {
      orderBy?: any;
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
        total: any;
      }
  > {
    if (typeof filter === 'object' && filter !== null) {
      Object.assign(filter, { deleted_at: null });
    }

    const data = ignorePagination
      ? await prisma.marketPlace.findMany({
          where: { user_id: filter.user_id },
        })
      : await paginate<typeof prisma.marketPlace>(
          filter,
          options,
          prisma.marketPlace,
        );
    return data;
  }

  async updateMarketItemByItem_Id(
    id: string,
    updateBody: marketPlace,
  ): Promise<{ Item: marketPlace }> {
    const Item = await prisma.marketPlace.update({
      where: { id },
      data: { ...updateBody },
    });
    return { Item };
  }

  async deleteMarketItemByItem_Id(id: string): Promise<{ Item: marketPlace }> {
    const Item = await prisma.marketPlace.delete({
      where: { id },
    });

    return { Item };
  }

  async listings(
    filter: typeof Object | unknown | any,
    options: {
      orderBy?: any;
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
        total: any;
      }
  > {
    if (typeof filter === 'object' && filter !== null) {
      Object.assign(filter, { deleted_at: null });
    }

    const data = ignorePagination
      ? await prisma.marketPlace.findMany()
      : await paginate<typeof prisma.marketPlace>(
          filter,
          options,
          prisma.marketPlace,
        );
    return data;
  }

  async addCategory(createBody: Categories): Promise<{ category: Categories }> {
    const category: Categories = await prisma.categories.create({
      data: { ...createBody },
    });

    return { category };
  }

  async getAllCategory(
    filter: typeof Object | unknown | any,
    options: {
      orderBy?: any;
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
        total: any;
      }
  > {
    if (typeof filter === 'object' && filter !== null) {
      Object.assign(filter, { deleted_at: null });
    }

    const data = ignorePagination
      ? await prisma.categories.findMany()
      : await paginate<typeof prisma.categories>(
          filter,
          options,
          prisma.categories,
        );
    return data;
  }
}
