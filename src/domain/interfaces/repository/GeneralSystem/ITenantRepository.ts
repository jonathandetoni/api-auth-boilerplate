import { TenantDtoCreate } from "../../../dtos/GeneralSystem/Tenant/TenantDtoCreate";
import { TenantDtoList } from "../../../dtos/GeneralSystem/Tenant/TenantDtoList";
import { TenantDtoCreateResult } from "../../../dtos/GeneralSystem/Tenant/result/TenantDtoCreateResult";
import { GeneralResponse } from "../../service/generalResponse";

export interface ITenantRepository {
    create(entity: TenantDtoCreate ) : Promise<GeneralResponse>;
    read(id: string) : Promise<GeneralResponse>;
    readByName(name: string): Promise<GeneralResponse>;
}