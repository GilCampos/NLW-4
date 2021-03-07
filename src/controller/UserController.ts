import { Request, Response } from "express";
import { getCustomRepository, getRepository } from "typeorm";
import { User } from "../models/User";
import { UserRepository } from "../repositories/UserRepository";

class UserController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body;
    
    const usersRepository = getCustomRepository(UserRepository);
    //SELECT * FROM USERS WHERE EMAIL = "EMAIL"
    const userAlreadyExists = await usersRepository.findOne({
      email
    })
    //RETORNAR ERRO SE O USUÁRIO JÁ EXISTIR
    if(userAlreadyExists) {
      return response.status(400).json({
        error: "User already exists!",
      })
    }

    const user = usersRepository.create({
      name, email
    })

    await usersRepository.save(user);

    return response.json(user);
  }
}

export { UserController }