import { EntityRepository, Repository } from "typeorm";
import { Survey } from "../models/Survey";

//reponsabilidade = vai utilizar todos os métodos que o typeorm fornece
@EntityRepository(Survey)
class SurveysRepository extends Repository<Survey>{

}

export { SurveysRepository };

