import { IUserResult } from "../../../../service/DataBasic/UserService";
import { UserDtoCreate } from "../../../dtos/DataBasic/User/UserDtoCreate";
import { UserDtoList } from "../../../dtos/DataBasic/User/UserDtoList";
import { UserDtoCreateResult } from "../../../dtos/DataBasic/User/result/UserDtoCreateResult";

export interface IUserService {
    create(entity: UserDtoCreate) : Promise<UserDtoCreateResult>;
    read(id: string) : Promise<UserDtoList>;
    me(token: string) : Promise<IUserResult>;
}