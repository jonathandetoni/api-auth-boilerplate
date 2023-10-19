import { UserDtoCreate } from "../../domain/dtos/DataBasic/User/UserDtoCreate";
import { TenantDtoList } from "../../domain/dtos/GeneralSystem/Tenant/TenantDtoList";
import { IUserRepository } from "../../domain/interfaces/repository/DataBasic/IUserRepository";
import { IUserService } from "../../domain/interfaces/service/DataBasic/IUserService";
import { TypeUser } from "../../infrastructure/utils/constants/typesUser";
import { GeneralResponse } from "../../infrastructure/utils/generalResponse";
import { jwtDecode } from "../../infrastructure/utils/middleware/authHelper";

export interface IUserResult {
    id: string;
    email: string;
    cpf: string;
    tenant: TenantDtoList;
    role: string;
    typeUser: TypeUser
}

class UserService implements IUserService {
  private readonly _repository: IUserRepository;

  constructor(repository: IUserRepository){
    this._repository = repository;
  }
  
  async me(token: string): Promise<GeneralResponse> {
    const userDecoded = await jwtDecode(token);

    const resulRead = await this._repository.read(userDecoded.id);

    const data: IUserResult = {
      id: resulRead.data.id,
      email: resulRead.data.email,
      cpf: resulRead.data.cpf,
      tenant: resulRead.data.tenant,
      role: resulRead.data.role,
      typeUser: resulRead.data.typeUser
    }

    return {
      success: resulRead.success,
      statusCode: resulRead.statusCode,
      data
    }
  }
  async read(id: string): Promise<GeneralResponse> {
    return await this._repository.read(id);
  }
  async create(entity: UserDtoCreate): Promise<GeneralResponse> {
    return await this._repository.create(entity);
  }
}

export { UserService }