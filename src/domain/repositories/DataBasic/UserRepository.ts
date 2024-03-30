import { prismaClient } from '../../../infrastructure/config/database/prismaClient';
import { LogLevelEnum, Logger } from '../../../infrastructure/utils/log/logger';
import { IUserRepository } from '../../interfaces/repository/DataBasic/IUserRepository';
import { UserDtoList } from '../../dtos/DataBasic/User/UserDtoList';
import { UserDtoCreate } from '../../dtos/DataBasic/User/UserDtoCreate';
import { UserDtoCreateResult } from '../../dtos/DataBasic/User/result/UserDtoCreateResult';
import { hashPassword } from '../../../infrastructure/utils/middleware/authHelper';
import { HttpStatusCode } from '../../../infrastructure/utils/constants/httpStatusCode';
import { GeneralResponse } from '../../../infrastructure/utils/generalResponse';

class UserRepository implements IUserRepository {
    async create(entity: UserDtoCreate): Promise<GeneralResponse> {
        try {
            const upsertReturn = await prismaClient.users.upsert({
                where: {
                    id: entity.id,
                    email: entity.email
                },
                update: {
                    email: entity.email,
                    password: await hashPassword(entity.password),
                    tenantId: entity.tenantId,
                    role: entity.role,
                    typeUser: entity.typeUser,
                },
                create: {
                    email: entity.email,
                    password: await hashPassword(entity.password),
                    cpf: entity.cpf,
                    tenantId: entity.tenantId,
                    role: entity.role,
                    typeUser: entity.typeUser,
                },
                select: {
                    id: true,
                    createdAt: true,
                    email: true,
                    tenant: true,
                    role: true,
                    typeUser: true
                }
            }) as UserDtoCreateResult

            return {
                success: true,
                statusCode: HttpStatusCode.OK,
                data: upsertReturn
            }
        } catch (error: any) {
            Logger.error(error);

            return {
                success: false,
                error: {
                    message: "Erro inesperado ao criar usuário!",
                    errorMessage: error.message,
                    details: [{
                        errorDetails: error.toString(),
                        typeError: LogLevelEnum.ERROR    
                    }]
                },
                statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR
            }
        }
    }

    async read(id: string): Promise<GeneralResponse> {
        try {
            const resultRead = await prismaClient.users.findFirstOrThrow({
                where: {
                    id: id
                },
                select: {
                    id: true,
                    createdAt: true,
                    updatedAt: true,
                    email: true,
                    cpf: true
                }
            }) as UserDtoList;

            return {
                success: true,
                statusCode: HttpStatusCode.OK,
                data: resultRead
            }
        } catch (error: any) {
            Logger.error(error)

            return {
                success: false,
                error: {
                    message: "Erro inesperado ao consultar usuário!",
                    errorMessage: error.message,
                    details: [{
                        errorDetails: error.toString(),
                        typeError: LogLevelEnum.ERROR    
                    }]
                },
                statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR
            }
        }
    }

    async readByEmail(email: string): Promise<GeneralResponse> {
        try {
            const resultRead = await prismaClient.users.findFirstOrThrow({
                where: {
                    email: email
                },
                select: {
                    id: true,
                    createdAt: true,
                    updatedAt: true,
                    cpf: true,
                    email: true
                }
            }) as UserDtoList;

            return {
                success: true,
                statusCode: HttpStatusCode.OK,
                data: resultRead
            };
        } catch (error: any) {
            Logger.error(error)

            return {
                success: false,
                error: {
                    message: "Erro inesperado ao consultar usuário por e-mail!",
                    errorMessage: error.message,
                    details: [{
                        errorDetails: error.toString(),
                        typeError: LogLevelEnum.ERROR    
                    }]
                },
                statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR
            }
        }
    }

    async readByEmailWithPassword(email: string): Promise<GeneralResponse> {
        try {
            const resultRead = await prismaClient.users.findFirstOrThrow({
                where: {
                    email: email
                },
                select: {
                    id: true,
                    createdAt: true,
                    updatedAt: true,
                    cpf: true,
                    email: true,
                    password: true,
                    role: true,
                    tenant: true,
                    typeUser: true
                }
            }) as UserDtoList;

            return {
                success: true,
                statusCode: HttpStatusCode.OK,
                data: resultRead
            };
        } catch (error: any) {
            Logger.error(error)

            return {
                success: false,
                error: {
                    message: "Erro ao consultar usuário!",
                    errorMessage: error.message,
                    details: [{
                        errorDetails: error.toString(),
                        typeError: LogLevelEnum.ERROR    
                    }]
                },
                statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR
            }
        }
    }
}

export { UserRepository }