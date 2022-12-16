/**
 * Use this module file to create instances of all controllers and simplify imports in to your routers
 */

//import EncryptionService from "../../services/Encryption.service";
//import EmailService from "../../services/Email.service";
import SocialService from "../../services/Social.service";

import UserController from "./users.controller";
export const userController = new UserController();

import SocialController from "./social.controllers";
export const socialController = new SocialController(new SocialService());
