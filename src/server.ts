import "reflect-metadata";
import express, { Application } from 'express';
import Router from "@/infrastructure/user-interface/api/Router";

const app: Application = express();

app.use('/api', Router)

app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
