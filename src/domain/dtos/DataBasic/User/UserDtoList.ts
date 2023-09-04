export type UserDtoList = {
    id: string;
    cpf: string;
    email: string;
    password?: string;
    tenantId: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}