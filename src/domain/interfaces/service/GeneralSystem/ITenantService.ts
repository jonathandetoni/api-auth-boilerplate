import { TenantDtoCreate } from "../../../dtos/GeneralSystem/Tenant/TenantDtoCreate";
import { TenantDtoList } from "../../../dtos/GeneralSystem/Tenant/TenantDtoList";
import { TenantDtoCreateResult } from "../../../dtos/GeneralSystem/Tenant/result/TenantDtoCreateResult";

export interface ITenantService {
    create(entity: TenantDtoCreate) : Promise<TenantDtoCreateResult>;
    read(id: string) : Promise<TenantDtoList>;
    readByName(name: string) : Promise<TenantDtoList>;
}