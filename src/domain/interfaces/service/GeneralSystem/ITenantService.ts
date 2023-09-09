import { TenantDtoCreate } from "../../../dtos/GeneralSystem/Tenant/TenantDtoCreate";
import { GeneralResponse } from "../generalResponse";

export interface ITenantService {
    create(entity: TenantDtoCreate) : Promise<GeneralResponse>;
    read(id: string) : Promise<GeneralResponse>;
    readByName(name: string) : Promise<GeneralResponse>;
}