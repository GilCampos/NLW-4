import { Request, Response } from "express"
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersrepository } from "../repositories/SurveysUsersRepository";
import { UserRepository } from "../repositories/UserRepository";
import SendMailService from "../services/SendMailService";

class SendMailController {

    async execute(request: Request, response: Response) {

        const {email, survey_id } = request.body;

        const usersRepository = getCustomRepository(UserRepository);
        const surveysRepository = getCustomRepository(SurveysRepository);
        const surveysUsersRepository = getCustomRepository(SurveysUsersrepository);

        //verificar se o email existe
        const userAlreadyExists = await usersRepository.findOne({email});

        if(!userAlreadyExists){
            return response.status(400).json({
                error: "User does not exists",
            });
        }

        const survey = await surveysRepository.findOne({id: survey_id})

        if(!survey) {
            return response.status(400).json({
                error: "Survey does not exists",
            });
        }

        //salvar as informações da tabela surveyUser
        const surveyUser = surveysUsersRepository.create({
            user_id: userAlreadyExists.id,
            survey_id,
        });

        await surveysUsersRepository.save(surveyUser);
        //Enviar e-mail par o usuario
        await SendMailService.execute(email,survey.title, survey.description);
        return response.json(surveyUser);        
    }
}
export { SendMailController }