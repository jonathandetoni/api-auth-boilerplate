import { GeneralResponse } from "../../../../infrastructure/utils/generalResponse";
import { TenantDtoCreate } from "../../../dtos/GeneralSystem/Tenant/TenantDtoCreate";

export interface ITenantRepository {
    create(entity: TenantDtoCreate ) : Promise<GeneralResponse>;
    read(id: string) : Promise<GeneralResponse>;
    readByName(name: string): Promise<GeneralResponse>;
}