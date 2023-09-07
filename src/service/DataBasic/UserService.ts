import { UserDtoCreate } from "../../domain/dtos/DataBasic/User/UserDtoCreate";
import { UserDtoList } from "../../domain/dtos/DataBasic/User/UserDtoList";
import { UserDtoCreateResult } from "../../domain/dtos/DataBasic/User/result/UserDtoCreateResult";
import { TenantDtoList } from "../../domain/dtos/GeneralSystem/Tenant/TenantDtoList";
import { IUserRepository } from "../../domain/interfaces/repository/DataBasic/IUserRepository";
import { IUserService } from "../../domain/interfaces/service/DataBasic/IUserService";
import { TypeUser } from "../../infrastrutucture/utils/constants/typesUser";
import { jwtDecode } from "../../infrastrutucture/utils/middleware/authHelper";

export interface IUserResult {
  user: {
    id: string;
    email: string;
    cpf: string;
    tenant: TenantDtoList;
    role: string;
    typeUser: TypeUser
  }
}

class UserService implements IUserService {
  private readonly _repository: IUserRepository;

  constructor(repository: IUserRepository){
    this._repository = repository;
  }
  async me(token: string): Promise<IUserResult> {
    const userDecoded = await jwtDecode(token);

    const user = await this._repository.read(userDecoded.id);

    const result : IUserResult = {
      user: {
        id: user.id,
        email: user.email,
        cpf: user.cpf,
        tenant: user.tenant,
        role: user.role,
        typeUser: user.typeUser
      }
    }

    return result;
  }
  async read(id: string): Promise<UserDtoList> {
    const result = await this._repository.read(id);

    return result;
  }
  async create(entity: UserDtoCreate): Promise<UserDtoCreateResult> {
    const result = await this._repository.create(entity)

    return result;
  }
}

export { UserService }