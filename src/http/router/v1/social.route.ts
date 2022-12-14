import { Router, Request, Response, NextFunction } from "express";
//import { loginUser } from "../../../authentication/authentication.module";

import { socialController } from "../../controllers/controllers.module";

//import { LoginValidator } from "../../../validators/Auth.validation";

//import validate from "../../middlewares/validate";

const route = Router();

route.post(
  "/create-post",
  (req: Request, res: Response, next: NextFunction) => {
    //loginUser._loginUser(req, res, next);
    socialController.createPost(req, res, next);
  }
);

export default route;
