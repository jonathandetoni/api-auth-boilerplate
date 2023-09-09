import { UserDtoCreate } from "../../../dtos/DataBasic/User/UserDtoCreate";
import { GeneralResponse } from "../../service/generalResponse";

export interface IUserRepository {
    create(entity: UserDtoCreate ) : Promise<GeneralResponse>;
    read(id: string) : Promise<GeneralResponse>;
    readByEmail(email: string): Promise<GeneralResponse>;
    readByEmailWithPassword(email: string): Promise<GeneralResponse>;
}