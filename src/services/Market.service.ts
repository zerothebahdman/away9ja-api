import prisma from '../database/model.module';
import { marketPlace, MarketPlaceCategories } from '@prisma/client';
import paginate from '../utils/paginate';

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

  async addCategory(createBody: MarketPlaceCategories) {
    const category = await prisma.marketPlaceCategories.create({
      data: { ...createBody },
    });

    return category;
  }

  async getAllCategory(
    filter: Partial<MarketPlaceCategories>,
    options: {
      orderBy?: string;
      page?: string;
      limit?: string;
      populate?: string;
    } = {},
    ignorePagination = false,
  ): Promise<
    | MarketPlaceCategories[]
    | {
        results: MarketPlaceCategories[];
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
      ? await prisma.marketPlaceCategories.findMany()
      : await paginate<
          MarketPlaceCategories,
          typeof prisma.marketPlaceCategories
        >(filter, options, prisma.marketPlaceCategories);
    return data;
  }
}
