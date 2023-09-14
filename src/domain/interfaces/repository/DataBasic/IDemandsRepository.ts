import { DemandsDtoCreate } from "../../../dtos/DataBasic/Demands/Demands/DemandsDtoCreate";
import { GeneralResponse } from "../../service/generalResponse";

export interface IDemandsRepository {
    create(entity: DemandsDtoCreate ) : Promise<GeneralResponse>;
    read(id: string) : Promise<GeneralResponse>;
    readByOwnerId(ownerId: string): Promise<GeneralResponse>;
    delete(budgetId: string): Promise<GeneralResponse>;
    update(entity: DemandsDtoCreate): Promise<GeneralResponse>;
}