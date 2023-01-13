import { Router } from 'express';
import authRoute from './auth.route';
import socialRoute from './social.route';
import eventRoute from './event.route';

const router = Router();

const defaultRoutes = [
  { path: '/auth', route: authRoute },
  { path: '/social', route: socialRoute },
  { path: '/event', route: eventRoute },
];

defaultRoutes.forEach(({ path, route }) => {
  router.use(path, route);
});

export default router;
