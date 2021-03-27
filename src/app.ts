//importanto o reflect-metadata
import "reflect-metadata";
//importando o express
import express from 'express';
//import "./database";
import createConnection from "./database";
import { router } from "./routes";

createConnection();
const app = express();
app.use(express.json());
app.use(router);

export { app };