import { Router } from 'express';
import authRoute from './auth.route';
import socialRoute from './social.route';
import marketRoute from './market.route';
import eventRoute from './event.route';
import userRoute from './user.route';

const router = Router();

const defaultRoutes = [
  { path: '/auth', route: authRoute },
  { path: '/user', route: userRoute },
  { path: '/social', route: socialRoute },
  { path: '/market', route: marketRoute },
  { path: '/event', route: eventRoute },
];

defaultRoutes.forEach(({ path, route }) => {
  router.use(path, route);
});

export default router;
