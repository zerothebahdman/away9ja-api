import { Router } from "express";
import authRoute from "./auth.route";
import socialRoute from "./social.route";

const router = Router();

const defaultRoutes = [
  { path: "/auth", route: authRoute },
  { path: "/social", route: socialRoute },
];

defaultRoutes.forEach(({ path, route }) => {
  router.use(path, route);
});

export default router;
