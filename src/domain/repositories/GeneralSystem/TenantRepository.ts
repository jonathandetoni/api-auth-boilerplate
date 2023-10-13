import { prismaClient } from '../../../infrastructure/config/database/prismaClient';
import { LogLevelEnum, Logger } from '../../../infrastructure/utils/log/logger';
import { ITenantRepository } from '../../interfaces/repository/GeneralSystem/ITenantRepository';
import { TenantDtoCreate } from '../../dtos/GeneralSystem/Tenant/TenantDtoCreate';
import { TenantDtoList } from '../../dtos/GeneralSystem/Tenant/TenantDtoList';
import { TenantDtoCreateResult } from '../../dtos/GeneralSystem/Tenant/result/TenantDtoCreateResult';
import { GeneralResponse } from '../../interfaces/service/generalResponse';
import { HttpStatusCode } from '../../../infrastructure/utils/constants/httpStatusCode';

class TenantRepository implements ITenantRepository {
    async create(entity: TenantDtoCreate): Promise<GeneralResponse> {
        try {
            const resultCreate = await prismaClient.tenants.upsert({
                where: {
                    id: entity.id,
                    name: entity.name
                },
                create: {
                    name: entity.name,
                    description: entity.description
                },
                update: {
                    name: entity.name,
                    description: entity.description
                }
            }) as TenantDtoCreateResult;

            return {
                success: true,
                data: resultCreate,
                statusCode: HttpStatusCode.OK
            }
        } catch (error: any) {
            Logger.error(error);

            return {
                success: false,
                error: {
                    message: "Erro inesperado ao criar Tenant!",
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
            const resultRead =  await prismaClient.tenants.findFirstOrThrow({
                where: {
                    id: id
                }
            }) as TenantDtoList;

            return {
                success: true,
                data: resultRead,
                statusCode: HttpStatusCode.OK
            }
        } catch (error: any) {
            Logger.error(error);

            return {
                success: false,
                error: {
                    message: "Erro inesperado ao consultar Tenant!",
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
    async readByName(name: string): Promise<GeneralResponse> {
        try {
            const resultRead = await prismaClient.tenants.findFirstOrThrow({
                where: {
                    name: name
                }
            }) as TenantDtoList;

            return {
                success: true,
                data: resultRead,
                statusCode: HttpStatusCode.OK
            }
        } catch (error: any) {
            Logger.error(error);

            return {
                success: false,
                error: {
                    message: "Erro inesperado ao consultar Tenant!",
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

export { TenantRepository }