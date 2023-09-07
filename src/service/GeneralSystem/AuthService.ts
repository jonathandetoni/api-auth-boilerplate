import { AuthDto, AuthDtoResult } from "../../domain/dtos/GeneralSystem/Auth/AuthDto";
import { IUserRepository } from "../../domain/interfaces/repository/DataBasic/IUserRepository";
import { IAuthService } from "../../domain/interfaces/service/GeneralSystem/IAuthService";
import { Logger } from "../../infrastrutucture/utils/log/logger";
import { comparePasswords, jwtSign } from "../../infrastrutucture/utils/middleware/authHelper";


export interface IAuthResult {
  user: {
    id: string;
    email: string;
    cpf: string;
  },
  acessToken: string;
  authorized: boolean;
}

class AuthService implements IAuthService {
  private readonly _repositoryUser: IUserRepository;

  constructor(repositoryUser: IUserRepository){
    this._repositoryUser = repositoryUser;
  }
  
  async auth(entity: AuthDto): Promise<AuthDtoResult> {
    const user = await this._repositoryUser.readByEmailWithPassword(entity.email);
    
    if (!user || !user.password || !await comparePasswords(entity.password, user.password)) {
      throw Logger.error("Email or password ivalid!");
    }

    const result : IAuthResult = {
      user: {
        id: user.id,
        email: user.email,
        cpf: user.cpf,
      },
      acessToken: await jwtSign(user),
      authorized: true
    }

    return result;
  }
}

export { AuthService }