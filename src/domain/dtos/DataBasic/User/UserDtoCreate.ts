import { TypeUser } from "../../../../infrastructure/utils/constants/typesUser";

export type UserDtoCreate = {
    id?: string;
    cpf: string;
    email: string;
    password: string;
    tenantId: string;
    role: string;
    typeUser: TypeUser;
}