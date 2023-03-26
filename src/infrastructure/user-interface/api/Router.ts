import express, { Router } from 'express';
import AuthRouter from '@/infrastructure/user-interface/api/auth/Router';
import MessageRouter from '@/infrastructure/user-interface/api/message/Router';

const router: Router = express.Router();

router.use('/auth', AuthRouter);
router.use('/message', MessageRouter);

export default router;
