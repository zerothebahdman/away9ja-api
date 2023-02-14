/**
 * Use this module file to create instances of all controllers and simplify imports in to your routers
 */

import SocialService from '../../services/Social.service';
import MarketService from '../../services/Market.service';
import UserController from './users.controller';
import SocialController from './social.controllers';
import MarketController from './market.controller';
import EventController from './event.controller';
import EventService from '../../services/Event.service';
import UserService from '../../services/User.service';
import EmailService from '../../services/Email.service';

export const socialController = new SocialController(
  new SocialService(new UserService()),
  new UserService(),
);
export const userController = new UserController(
  new UserService(),
  new EmailService(),
);
export const eventController = new EventController(
  new EventService(),
  new UserService(),
);
export const marketController = new MarketController(
  new MarketService(),
  new UserService(),
);
