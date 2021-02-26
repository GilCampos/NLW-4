//importanto o reflect-metadata
import "reflect-metadata";

//importando o express
import express from 'express';
import "./database";
const app= express();


// htttp://localhost:3334/users
app.get("/", (request, response) => {
    return response.json({message: "Hello World NLW4"});
});

//1 param = rota(recurso API)
//2 param = request, response
app.post("/", (request, response) => {
    //receber os dados para salvar
    return response.json({message: "Os dados foram salvos com sucesso!"});
});

//criando o servidor, passando a porta e verificando se executa
app.listen(3334, () => console.log("Server is running"));
