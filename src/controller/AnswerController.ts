import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveyUser } from "../models/SurveyUser";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class AnswerController {

    //estrutura do link
    //http://localhost:3334/answers/1?u=6888449b-10b7-441c-aef2-20e64c01c3bb
    /* 
    *Route Params = parametros que compõem a rota (answer,1)
    *routes.get("/answer/:value")
    *Query Params = parametros utilizados para busca, paginação e não são 
    *obrigatorios, vem sempre depois de ?
    *chave=valor
    */
    async execute(request: Request, response: Response){
        const { value } = request.params;
        const { u } = request.query;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveyUser = await surveysUsersRepository.findOne({
            //forçar o valor de u(opcional) a receber uma string
            id: String(u)
        });

        if(!SurveyUser){
            throw new AppError("Survey User does not exists!")
        }

        //fazendo parse de string para numero
        surveyUser.value = Number(value);

        await surveysUsersRepository.save(surveyUser);

        return response.json(surveyUser);  
    }
}

export { AnswerController };
