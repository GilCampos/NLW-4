//importanto o reflect-metadata
import "reflect-metadata";

//importando o express
import express from 'express';
import "./database";

const app= express();

//criando o servidor, passando a porta e verificando se executa
app.listen(3334, () => console.log("Server is running"));
