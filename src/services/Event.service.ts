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

  async getEventById(
    id: string,
    eagerLoadFields: string,
    eagerLoad = true,
  ): Promise<Event> {
    let include: object = {};
    if (eagerLoadFields) {
      const populate: object[] = [];
      eagerLoadFields.split(',').forEach((populateOption: string): void => {
        const data = { [populateOption]: true };
        populate.push(data);
      });

      // convert the array of populate objects to a single object
      include = populate.reduce((acc: object, cur: object) => {
        acc = { ...acc, ...cur };
        return acc;
      }, {});
    }

    const data = eagerLoad
      ? await prisma.event.findUnique({
          where: { id },
          include: Object.keys(include).length > 0 ? { ...include } : undefined,
        })
      : await prisma.event.findUnique({ where: { id } });
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
