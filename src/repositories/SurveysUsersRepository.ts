import { Entity, EntityRepository, Repository } from "typeorm";
import { SurveyUser } from "../models/SurveyUser";

@EntityRepository(SurveyUser)
class SurveysUsersrepository extends Repository<SurveyUser> {

}

export { SurveysUsersrepository };