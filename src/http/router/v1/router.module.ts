import { Router } from "express";
import authRoute from "./auth.route";
import socialRoute from "./social.route";

const router = Router();

const defaultRoutes = [{ path: "/auth", route: authRoute }];

defaultRoutes.forEach(({ path, route }) => {
  router.use(path, route);
});

router.use("/social", socialRoute);
export default router;
