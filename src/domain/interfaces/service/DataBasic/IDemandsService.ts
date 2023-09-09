
import { DemandsDtoCreate } from "../../../dtos/DataBasic/Demands/Demands/DemandsDtoCreate";
import { UserDtoCreate } from "../../../dtos/DataBasic/User/UserDtoCreate";
import { GeneralResponse } from "../generalResponse";

export interface IDemandsService {
    create(entity: DemandsDtoCreate ) : Promise<GeneralResponse>;
    read(id: string) : Promise<GeneralResponse>;
    readByOwnerId(ownerId: string): Promise<GeneralResponse>;
}