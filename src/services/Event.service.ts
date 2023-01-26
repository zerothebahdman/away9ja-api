import { Event } from '@prisma/client';
import prisma from '../database/model.module';
import paginate from '../utils/paginate';

export default class EventService {
  async getEvents(
    filter: Partial<Event>,
    options: {
      orderBy?: string;
      page?: string;
      limit?: string;
      populate?: string;
    } = {},
    ignorePagination = false,
  ): Promise<
    | Event[]
    | {
        results: object;
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
      ? await prisma.event.findMany()
      : await paginate<Event, typeof prisma.event>(
          filter,
          options,
          prisma.event,
        );
    return data;
  }

  async getEventById(id: string): Promise<Event> {
    const data = await prisma.event.findUnique({ where: { id } });
    return data;
  }

  async createEvent(createBody: Event): Promise<Event> {
    const data = await prisma.event.create({ data: createBody });
    return data;
  }

  async updateEventById(
    id: string,
    updateBody: Partial<Event>,
  ): Promise<Event> {
    const data = await prisma.event.update({ where: { id }, data: updateBody });
    return data;
  }

  async deleteEventById(id: string): Promise<Event> {
    const data = await prisma.event.delete({ where: { id } });
    return data;
  }
}
