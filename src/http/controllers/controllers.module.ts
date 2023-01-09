/**
 * Use this module file to create instances of all controllers and simplify imports in to your routers
 */

import SocialService from '../../services/Social.service';
import UserController from './users.controller';
import SocialController from './social.controllers';

export const socialController = new SocialController(new SocialService());
export const userController = new UserController();
