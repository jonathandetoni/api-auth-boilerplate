
import { DemandsDtoCreate } from "../../../dtos/DataBasic/Demands/Demands/DemandsDtoCreate";
import { GeneralResponse } from "../generalResponse";

export interface IDemandsService {
    create(entity: DemandsDtoCreate ) : Promise<GeneralResponse>;
    read(id: string) : Promise<GeneralResponse>;
    readByOwnerId(ownerId: string): Promise<GeneralResponse>;
    delete(demandId: string): Promise<GeneralResponse>;
    update(entity: DemandsDtoCreate): Promise<GeneralResponse>;
}