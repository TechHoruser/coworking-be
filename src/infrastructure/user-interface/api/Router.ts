import 'reflect-metadata';
import express, { Router } from 'express';
import MessageRouter from '@/infrastructure/user-interface/api/message/Router';

const router: Router = express.Router();

router.use('/message', MessageRouter);

export default router;
