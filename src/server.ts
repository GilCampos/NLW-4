//importanto o reflect-metadata
import "reflect-metadata";
//importando o express
import express from 'express';
import "./database";
import { router } from "./routes";

const app= express();

app.use(express.json());
app.use(router);


//criando o servidor, passando a porta e verificando se executa
app.listen(3334, () => console.log("Server is running"));
