import express, { RequestHandler, Router } from 'express';
import AuthRouter from '@/infrastructure/user-interface/api/auth/Router';
import MessageRouter from '@/infrastructure/user-interface/api/message/Router';
import RoomRouter from '@/infrastructure/user-interface/api/room/Router';
import { JwtDecodeMiddleware } from '@/infrastructure/auth/JwtDecodeMiddleware';

const router: Router = express.Router();

interface routerInterface {
  path: string,
  router: Router,
}

interface MiddlewareInterface {
  middleware: RequestHandler,
  routers: Router[],
}

const routes: routerInterface[] = [
  {
    path: '/auth',
    router: AuthRouter,
  },
  {
    path: '/message',
    router: MessageRouter,
  },
  {
    path: '/room',
    router: RoomRouter,
  },
];

const middlewareUses: MiddlewareInterface[] = [
  {
    middleware: JwtDecodeMiddleware,
    routers: [
      MessageRouter,
      RoomRouter,
    ],
  },
];

routes.forEach((route: routerInterface) => {
  const middlewares: RequestHandler[] = [];

  middlewareUses.forEach((middlewareUse) => {
    if (middlewareUse.routers.includes(route.router)) {
      middlewares.push(middlewareUse.middleware);
    }
  });

  router.use(
    route.path,
    ...middlewares,
    route.router,
  );
});

export default router;
