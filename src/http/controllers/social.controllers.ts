import { NextFunction, Response } from "express";
import { RequestType } from "../middlewares/auth.middleware";

import AppException from "../../exceptions/AppException";

import SocialService from "../../services/Social.service";
import httpStatus from "http-status";
//import { Post } from "@prisma/client";
// import HelperClass from '../utils/helper';

export default class SocialController {
  constructor(private readonly socialService: SocialService) {}

  async createPost(
    req: RequestType,
    res: Response,
    next: NextFunction
  ): Promise<void | Response<any, Record<string, any>>> {
    try {
      const feed = { user_id: req.user.id, ...req.body };
      const { post } = await this.socialService.createPost(feed);
      return res.status(httpStatus.ACCEPTED).json({
        status: "success",
        message: `Your feeds has been Updated`,
        post,
      });
    } catch (err: any) {
      return next(
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST)
      );
    }
  }

  async getAllPost(
    req: RequestType,
    res: Response,
    next: NextFunction
  ): Promise<void | Response<any, Record<string, any>>> {
    try {
      const user_id = req.user.id;
      const posts = await this.socialService.getAllPost(user_id);
      return res.status(httpStatus.ACCEPTED).json({
        status: "success",
        message: `These are all your feeds`,
        posts,
      });
    } catch (err: any) {
      return next(
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST)
      );
    }
  }

  async editPost(
    req: RequestType,
    res: Response,
    next: NextFunction
  ): Promise<void | Response<any, Record<string, any>>> {
    try {
      const post_id = req.query.id.toString();

      const feed = {
        user_id: req.user.id,

        ...req.body,
      };
      const { post } = await this.socialService.updateUserPostById(
        post_id,
        feed
      );
      return res.status(httpStatus.ACCEPTED).json({
        status: "success",
        message: `Your feeds has been Updated`,
        post,
      });
    } catch (err: any) {
      return next(
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST)
      );
    }
  }

  async deletePost(
    req: RequestType,
    res: Response,
    next: NextFunction
  ): Promise<void | Response<any, Record<string, any>>> {
    try {
      const post_id = req.query.id.toString();

      const { post } = await this.socialService.deleteUserPostById(post_id);
      return res.status(httpStatus.ACCEPTED).json({
        status: "success",
        message: `This feed has been deleted`,
        post,
      });
    } catch (err: any) {
      return next(
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST)
      );
    }
  }
}
