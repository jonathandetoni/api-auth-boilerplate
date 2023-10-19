import { GeneralResponse } from "../../../../infrastructure/utils/generalResponse";
import { TenantDtoCreate } from "../../../dtos/GeneralSystem/Tenant/TenantDtoCreate";

export interface ITenantService {
    create(entity: TenantDtoCreate) : Promise<GeneralResponse>;
    read(id: string) : Promise<GeneralResponse>;
    readByName(name: string) : Promise<GeneralResponse>;
}