
import { UserDtoCreate } from "../../../dtos/DataBasic/User/UserDtoCreate";
import { GeneralResponse } from "../generalResponse";

export interface IUserService {
    create(entity: UserDtoCreate) : Promise<GeneralResponse>;
    read(id: string) : Promise<GeneralResponse>;
    me(token: string) : Promise<GeneralResponse>;
}