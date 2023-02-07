/**
 * Use this module file to create instances of all controllers and simplify imports in to your routers
 */

import NewbieCornerService from '../../services/NewbieCorner.service';
import NewbieCornerController from './newbieCorner.controller';
import SocialService from '../../services/Social.service';
import MarketService from '../../services/Market.service';
import UserController from './users.controller';
import SocialController from './social.controllers';
import MarketController from './market.controller';
import EventController from './event.controller';
import EventService from '../../services/Event.service';
import UserService from '../../services/User.service';
import EmailService from '../../services/Email.service';

export const socialController = new SocialController(new SocialService());
export const userController = new UserController(
  new UserService(),
  new EmailService(),
);
export const eventController = new EventController(new EventService());
export const marketController = new MarketController(new MarketService());
export const newbieCornerController = new NewbieCornerController(
  new NewbieCornerService(),
);
