import "reflect-metadata";
import MessageRouter from '@/infrastructure/user-interface/api/message/Router';
import express, { Router } from "express";

const router: Router = express.Router();

router.use('/message', MessageRouter);

export default router;
