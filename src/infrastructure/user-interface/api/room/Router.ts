import express, { Router } from 'express';
import container from '@/inversify.config';
import { CreateRoomController } from '@/infrastructure/user-interface/api/room/CreateRoomController';

const createRoomController = container.get<CreateRoomController>(CreateRoomController);

const router: Router = express.Router();

router.post('', createRoomController.invoke.bind(createRoomController));

export default router;
