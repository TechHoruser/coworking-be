import 'reflect-metadata';
import express, { Router } from 'express';
import container from '@/inversify.config';
import { LoginController } from '@/infrastructure/user-interface/api/auth/LoginController';
import { SignUpController } from '@/infrastructure/user-interface/api/auth/SignUpController';

const loginController = container.get<LoginController>(LoginController);
const signUpController = container.get<SignUpController>(SignUpController);

const router: Router = express.Router();

router.post('/login', loginController.invoke.bind(loginController));
router.post('/sign-up', signUpController.invoke.bind(signUpController));

export default router;
