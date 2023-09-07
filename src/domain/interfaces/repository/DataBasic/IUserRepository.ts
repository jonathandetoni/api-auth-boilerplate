import { UserDtoCreate } from "../../../dtos/DataBasic/User/UserDtoCreate";
import { UserDtoList } from "../../../dtos/DataBasic/User/UserDtoList";
import { UserDtoCreateResult } from "../../../dtos/DataBasic/User/result/UserDtoCreateResult";

export interface IUserRepository {
    create(entity: UserDtoCreate ) : Promise<UserDtoCreateResult>;
    read(id: string) : Promise<UserDtoList>;
    readByEmail(email: string): Promise<UserDtoList>;
    readByEmailWithPassword(email: string): Promise<UserDtoList>;
}