import { NextFunction, Request, Response } from "express";
//import AuthService from "../../services/Auth.service";
//mport TokenService from "../../services/Token.service";
import AppException from "../../exceptions/AppException";
// import EmailService from '../services/Email.service';
// import TokenMustStillBeValid from './rules/TokenMustStillBeValid';
// import EncryptionService from '../services/Encryption.service';
import { User } from "@prisma/client";
import UserService from "../../services/User.service";
import SocialService from "../../services/Social.service";
import TokenService from "../../services/Token.service";
import httpStatus from "http-status";
// import HelperClass from '../utils/helper';

export default class SocialController {
  constructor(
    private readonly userService: UserService,
    private readonly socialService: SocialService,
    private readonly tokenService: TokenService
  ) {}

  async createPost(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response<any, Record<string, any>>> {
    const { email, token } = req.body;
    try {
      if (!token) {
        res.send({
          message:
            "You have to login before you can add feeds to your timeline",
        });
        return next();
      }

      if (!email) {
        res.send({
          message: "Provide User email",
        });
        return next();
      }

      const userExists: User = await this.userService.getUserByEmail(email);
      const _token = await this.tokenService.verifyToken(token.accessToken);

      //authenticate user session before permitting activity by user

      if (!_token) {
        res.send({
          message: "Invalid Token",
        });
        return next();
      }

      //create feed using the socialService
      delete req.body.token; //had to delete this in order for the request body
      delete req.body.email; // to be valid for the schema model
      const feed = { user_id: userExists.id, ...req.body };

      const { post } = await this.socialService.createPost(feed);

      return res.status(httpStatus.ACCEPTED).json({
        status: "success",
        message: `We've updated your feeds`,
        post,
      });
    } catch (err: any) {
      return next(
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST)
      );
    }
  }

  async updatePost() {}

  async deletePost() {}
}
