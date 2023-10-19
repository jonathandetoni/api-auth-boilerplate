
import { GeneralResponse } from "../../../../infrastructure/utils/generalResponse";
import { UserDtoCreate } from "../../../dtos/DataBasic/User/UserDtoCreate";

export interface IUserService {
    create(entity: UserDtoCreate) : Promise<GeneralResponse>;
    read(id: string) : Promise<GeneralResponse>;
    me(token: string) : Promise<GeneralResponse>;
}