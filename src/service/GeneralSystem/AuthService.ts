import { AuthDto, AuthDtoResult } from "../../domain/dtos/GeneralSystem/Auth/AuthDto";
import { TenantDtoList } from "../../domain/dtos/GeneralSystem/Tenant/TenantDtoList";
import { IUserRepository } from "../../domain/interfaces/repository/DataBasic/IUserRepository";
import { IAuthService } from "../../domain/interfaces/service/GeneralSystem/IAuthService";
import { HttpStatusCode } from "../../infrastructure/utils/constants/httpStatusCode";
import { TypeUser } from "../../infrastructure/utils/constants/typesUser";
import { GeneralResponse } from "../../infrastructure/utils/generalResponse";
import { LogLevelEnum } from "../../infrastructure/utils/log/logger";
import { comparePasswords, jwtSign } from "../../infrastructure/utils/middleware/authHelper";

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
  
  async auth(entity: AuthDto): Promise<GeneralResponse> {
    const resulRead = await this._repositoryUser.readByEmailWithPassword(entity.email);

    if (!resulRead || !resulRead.data.password || !await comparePasswords(entity.password, resulRead.data.password)) {
      return {
        success: false,
        error: {
            message: "E-mail ou senha incorretos!",
            errorMessage: "E-mail ou senha incorretos!",
            details: [{
                errorDetails: "E-mail ou senha incorretos!",
                typeError: LogLevelEnum.INFO    
            }]
        },
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR
      }
    }

    const data : IAuthResult = {
      user: {
        id: resulRead.data.id,
        email: resulRead.data.email,
        cpf: resulRead.data.cpf,
        role: resulRead.data.role,
        typeUser: resulRead.data.typeUser,
        tenant: resulRead.data.tenant
      },
      acessToken: await jwtSign(resulRead.data),
      authorized: true
    }

    return {
      success: resulRead.success,
      statusCode: resulRead.statusCode,
      data
    };
  }
}

export { AuthService }