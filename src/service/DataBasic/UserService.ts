import { UserDtoCreate } from "../../domain/dtos/DataBasic/User/UserDtoCreate";
import { UserDtoList } from "../../domain/dtos/DataBasic/User/UserDtoList";
import { UserDtoCreateResult } from "../../domain/dtos/DataBasic/User/result/UserDtoCreateResult";
import { IUserRepository } from "../../domain/interfaces/repository/DataBasic/IUserRepository";
import { IUserService } from "../../domain/interfaces/service/DataBasic/IUserService";
import { jwtDecode } from "../../infrastrutucture/utils/middleware/authHelper";

export interface IUserResult {
  user: {
    id: string;
    email: string;
    cpf: string;
    tenantId: string;
    role: string;
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
        tenantId: user.tenantId,
        role: user.role,
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