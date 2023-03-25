import 'reflect-metadata';
import dotenv from 'dotenv';
import express, { Application } from 'express';
import Router from '@/infrastructure/user-interface/api/Router';

dotenv.config();

const app: Application = express();

app.use('/api', Router);

app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
