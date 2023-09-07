import { AuthDto, AuthDtoResult } from "../../domain/dtos/GeneralSystem/Auth/AuthDto";
import { TenantDtoList } from "../../domain/dtos/GeneralSystem/Tenant/TenantDtoList";
import { IUserRepository } from "../../domain/interfaces/repository/DataBasic/IUserRepository";
import { IAuthService } from "../../domain/interfaces/service/GeneralSystem/IAuthService";
import { TypeUser } from "../../infrastrutucture/utils/constants/typesUser";
import { Logger } from "../../infrastrutucture/utils/log/logger";
import { comparePasswords, jwtSign } from "../../infrastrutucture/utils/middleware/authHelper";


export interface IAuthResult {
  user: {
    id: string;
    email: string;
    cpf: string;
    role: string;
    typeUser: TypeUser,
    tenant: TenantDtoList
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
        role: user.role,
        typeUser: user.typeUser,
        tenant: user.tenant
      },
      acessToken: await jwtSign(user),
      authorized: true
    }

    return result;
  }
}

export { AuthService }