import { Router } from 'express';
import authRoute from './auth.route';
import socialRoute from './social.route';
import marketRoute from './market.route';

const router = Router();

const defaultRoutes = [
  { path: '/auth', route: authRoute },
  { path: '/social', route: socialRoute },
  { path: '/market', route: marketRoute },
];

defaultRoutes.forEach(({ path, route }) => {
  router.use(path, route);
});

export default router;
