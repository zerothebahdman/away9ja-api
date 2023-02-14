import prisma from '../database/model.module';
import { NotificationSettings, User } from '@prisma/client';
import paginate from '../utils/paginate';

export default class UserService {
  async getAllUsers(
    filter: Partial<User>,
    options: {
      orderBy?: string;
      page?: string;
      limit?: string;
      populate?: string;
    } = {},
    ignorePagination = false,
  ): Promise<
    | User[]
    | {
        results: typeof Object;
        page: number;
        limit: number;
        totalPages: number;
        total: number;
      }
  > {
    const data = ignorePagination
      ? await prisma.user.findMany()
      : await paginate<User, typeof prisma.user>(filter, options, prisma.user);
    return data;
  }

  async getUser(filter: Partial<User>): Promise<User> {
    const data = await prisma.user.findFirst({ where: filter });
    return data;
  }

  async getUserById(
    id: string,
    eagerLoad?: { include: { [key: string]: boolean } },
  ): Promise<User> {
    const data = eagerLoad
      ? await prisma.user.findUnique({ where: { id } })
      : await prisma.user.findUnique({ where: { id }, ...eagerLoad });
    if (!data) new Error(`User with id: ${id} does not exist`);
    return data;
  }

  async updateUserById(id: string, updateBody: Partial<User>): Promise<User> {
    const data = await prisma.user.update({ where: { id }, data: updateBody });
    return data;
  }

  async deleteUserById(id: string): Promise<User> {
    const data = await prisma.user.delete({ where: { id } });
    return data;
  }

  async getUserByEmail(email: string): Promise<User> {
    const data = await prisma.user.findUnique({ where: { email } });
    return data;
  }

  async getUserByUsername(username: string): Promise<User> {
    const data = await prisma.user.findUnique({ where: { username } });
    return data;
  }

  async getReferredUsers(
    filter: Partial<User>,
    options: {
      orderBy?: string;
      page?: string;
      limit?: string;
      populate?: string;
    } = {},
    ignorePagination = false,
  ): Promise<
    | User[]
    | {
        results: typeof Object;
        page: number;
        limit: number;
        totalPages: number;
        total: number;
      }
  > {
    const data = ignorePagination
      ? await prisma.user.findMany()
      : await paginate<User, typeof prisma.user>(filter, options, prisma.user);
    return data;
  }

  async getNotificationSettings(userId: string) {
    const data = await prisma.notificationSettings.findUnique({
      where: { userId },
    });
    return data;
  }

  async getUsersWhoCanReceiveNotification(
    filter: Partial<NotificationSettings>,
  ) {
    const data = await prisma.notificationSettings.findMany({
      where: { ...filter },
    });
    return data;
  }

  async updateNotificationSettings(
    userId: string,
    updateBody: Partial<NotificationSettings>,
  ) {
    const notificationExists = await prisma.notificationSettings.findUnique({
      where: { userId },
    });
    if (!notificationExists) {
      const data = await prisma.notificationSettings.create({
        data: { userId, ...updateBody },
      });
      return data;
    }
    const data = await prisma.notificationSettings.update({
      where: { userId },
      data: updateBody,
    });
    return data;
  }
}
