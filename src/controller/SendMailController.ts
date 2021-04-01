import { Request, Response } from "express"
import { getCustomRepository } from "typeorm";
import { resolve } from 'path';
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
        const user = await usersRepository.findOne({email});

        if(!user){
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

        const variables = {
            name: user.name,
            title: survey.title,
            description: survey.description,
            user_id: user.id,
            link: process.env.URL_MAIL,
        };

        const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");

        const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
            where: {user_id:user.id, value : null},
            relations: ["user", "survey"],
        });

        if(surveyUserAlreadyExists) {
            await SendMailService.execute(email, survey.title, variables, npsPath);
            return response.json(surveyUserAlreadyExists);
        }

        //salvar as informações da tabela surveyUser
        const surveyUser = surveysUsersRepository.create({
            user_id: user.id,
            survey_id,
        });
        
        await surveysUsersRepository.save(surveyUser);
                
         //Enviar e-mail par o usuario
        await SendMailService.execute(email,survey.title, variables, npsPath);
        return response.json(surveyUser);        
    }
}
export { SendMailController }