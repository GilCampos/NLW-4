import { Entity, EntityRepository, Repository } from "typeorm";
import { User } from "../models/User";

//reponsabilidade = vai utilizar todos os métodos que o typeorm fornece
@EntityRepository(User)
class UserRepository extends Repository<User>{



}

export { UserRepository }
