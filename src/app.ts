import 'reflect-metadata';
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import Router from '@/infrastructure/user-interface/api/Router';

const app: Application = express();

app.use(bodyParser.json());

app.use('/api', Router);

export default app;
