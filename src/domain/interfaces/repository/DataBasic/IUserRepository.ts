import { GeneralResponse } from "../../../../infrastructure/utils/generalResponse";
import { UserDtoCreate } from "../../../dtos/DataBasic/User/UserDtoCreate";

export interface IUserRepository {
    create(entity: UserDtoCreate ) : Promise<GeneralResponse>;
    read(id: string) : Promise<GeneralResponse>;
    readByEmail(email: string): Promise<GeneralResponse>;
    readByEmailWithPassword(email: string): Promise<GeneralResponse>;
}