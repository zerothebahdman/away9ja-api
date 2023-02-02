/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Response } from 'express';
import { RequestType } from '../middlewares/auth.middleware';
import AppException from '../../exceptions/AppException';
import MarketService from '../../services/Market.service';
import httpStatus from 'http-status';
import pick from '../../utils/pick';
import { CommentType } from '../../../config/constants';
import { ParentChildComment, marketPlaceComment } from '@prisma/client';
import HelperClass from '../../utils/helper';

export default class MarketController {
  constructor(private readonly marketService: MarketService) {}
  async addMarketItem(req: RequestType, res: Response, next: NextFunction) {
    try {
      const marketItem = { user_id: req.user.id, ...req.body };
      const Item = await this.marketService.addMarketItem(marketItem);
      return res.status(httpStatus.ACCEPTED).json({
        status: 'success',
        message: 'Your Listings has been updated with this item',
        Item,
      });
    } catch (err: any) {
      return next(
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST),
      );
    }
  }

  async getAllMyItem(req: RequestType, res: Response, next: NextFunction) {
    try {
      const filter = pick(req.query, ['user_id']);
      const options = pick(req.query, ['limit', 'page', 'populate', 'orderBy']);
      const myItems = await this.marketService.getAllMyItem(filter, options);
      return res.status(httpStatus.ACCEPTED).json({
        status: 'success',
        myItems,
      });
    } catch (err: any) {
      return next(
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST),
      );
    }
  }

  async getMarketItem(req: RequestType, res: Response, next: NextFunction) {
    try {
      const marketItem = await this.marketService.getMarketItemById(
        req.params.itemId,
      );
      return res.status(httpStatus.ACCEPTED).json({
        status: 'success',
        marketItem,
      });
    } catch (err: any) {
      return next(
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST),
      );
    }
  }

  async editMarketItem(req: RequestType, res: Response, next: NextFunction) {
    try {
      const marketItemId = req.query.id.toString();

      const marketItem = {
        user_id: req.user.id,
        ...req.body,
      };

      const marketPlaceItem = await this.marketService.updateMarketItemByItemId(
        marketItemId,
        marketItem,
      );
      return res.status(httpStatus.ACCEPTED).json({
        status: 'success',
        message: `This Item has been Updated in your Listings`,
        marketPlaceItem,
      });
    } catch (err: any) {
      return next(
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST),
      );
    }
  }

  async deleteMarketItemById(
    req: RequestType,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response<any, Record<string, any>>> {
    try {
      const marketItemId = req.query.id.toString();
      await this.marketService.deleteMarketItemByItemId(marketItemId);
      return res.status(httpStatus.NO_CONTENT).send();
    } catch (err: any) {
      return next(
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST),
      );
    }
  }

  async listings(req: RequestType, res: Response, next: NextFunction) {
    try {
      const filter = pick(req.query, ['user_id']);
      const options = pick(req.query, ['limit', 'page', 'populate', 'orderBy']);
      const allItems = await this.marketService.listings(filter, options);
      return res.status(httpStatus.ACCEPTED).json({
        status: 'success',
        allItems,
      });
    } catch (err: any) {
      return next(
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST),
      );
    }
  }

  async addCategory(req: RequestType, res: Response, next: NextFunction) {
    try {
      //const categoryBody = { user_id: req.user.id, ...req.body };
      const category = await this.marketService.addCategory({
        ...req.body,
      });
      return res.status(httpStatus.ACCEPTED).json({
        status: 'success',
        message: 'MarketPlaceCategories has been updated with this category',
        category,
      });
    } catch (err: any) {
      return next(
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST),
      );
    }
  }

  async getAllCategory(req: RequestType, res: Response, next: NextFunction) {
    try {
      const filter = pick(req.query, ['user_id']);
      const options = pick(req.query, ['limit', 'page', 'populate', 'orderBy']);
      const marketPlaceCategories = await this.marketService.getAllCategory(
        filter,
        options,
      );
      return res.status(httpStatus.ACCEPTED).json({
        status: 'success',
        marketPlaceCategories,
      });
    } catch (err: any) {
      return next(
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST),
      );
    }
  }

  async createMarketPlaceComment(
    req: RequestType,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const parentMarketComment: string =
        req.body.parent_market_place_comment_id;
      delete req.body.parent_market_place_comment_id;
      const commentBody = { user_id: req.user.id, ...req.body };
      const comment = await this.marketService.createMarketPlaceComment(
        commentBody,
      );
      if (req.body.type === CommentType.SUB_COMMENT) {
        const subCommentBody: Pick<
          ParentChildComment,
          'parent_market_place_comment_id' | 'child_market_place_comment_id'
        > = {
          parent_market_place_comment_id: parentMarketComment,
          child_market_place_comment_id: comment?.id,
        };
        await this.marketService.createMarketSubComment(subCommentBody);
      }
      return res.status(httpStatus.ACCEPTED).json({
        status: 'success',
        comment: HelperClass.removeUnwantedProperties(comment, ['deleted_at']),
      });
    } catch (err: any) {
      return next(
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST),
      );
    }
  }

  async getMarketPlaceCommentByAuthor(
    req: RequestType,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const comments: any =
        await this.marketService.getMarketPlaceCommentsByAuthor({
          type: req.query.type,
          marketPlaceId: req.params.marketplaceitemid,
        });
      return res.status(httpStatus.ACCEPTED).json({
        status: 'success',
        comments,
      });
    } catch (err: any) {
      return next(
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST),
      );
    }
  }

  async getMarketPlaceCommentByUser(
    req: RequestType,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const comments: any =
        await this.marketService.getMarketPlaceCommentsByUser({
          type: req.query.type,
          marketPlaceId: req.params.marketplaceitemid,
          user_id: req.user.id,
        });
      return res.status(httpStatus.ACCEPTED).json({
        status: 'success',
        comments,
      });
    } catch (err: any) {
      return next(
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST),
      );
    }
  }

  async getMarketPlaceSubComment(
    req: RequestType,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const marketPlaceSubCommentsIds =
        await this.marketService.getMarketPlaceSubComments({
          parent_market_place_comment_id: req.params.marketPlace_comment_id,
        });
      const marketPlaceSubComments: marketPlaceComment[] = [];
      await Promise.all(
        marketPlaceSubCommentsIds.map(async (subComment) => {
          const _subComment =
            await this.marketService.getMArketPlaceCommentById(
              subComment.child_market_place_comment_id,
            );
          marketPlaceSubComments.push(_subComment);
        }),
      );
      return res.status(httpStatus.ACCEPTED).json({
        status: 'success',
        marketPlaceSubComments,
      });
    } catch (err: any) {
      return next(
        new AppException(err.message, err.status || httpStatus.BAD_REQUEST),
      );
    }
  }
}
