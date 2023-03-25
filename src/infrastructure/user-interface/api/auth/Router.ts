import 'reflect-metadata';
import express, { Router } from 'express';
import container from '@/inversify.config';
import { SendMessageController } from '@/infrastructure/user-interface/api/message/SendMessageController';

const sendMessageController = container.get<LoginC>(SendMessageController);

const router: Router = express.Router();

router.get('/send', sendMessageController.invoke.bind(sendMessageController));

export default router;
