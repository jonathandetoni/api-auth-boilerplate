import { TypeUser } from "../../../../infrastrutucture/utils/constants/typesUser";
import { TenantDtoList } from "../../GeneralSystem/Tenant/TenantDtoList";

export type UserDtoList = {
    id: string;
    cpf: string;
    email: string;
    password?: string;
    tenant: TenantDtoList;
    role: string;
    typeUser: TypeUser
    createdAt: Date;
    updatedAt: Date;
}