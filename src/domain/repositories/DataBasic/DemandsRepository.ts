import { prismaClient } from '../../../infrastructure/config/database/prismaClient';
import { LogLevelEnum, Logger } from '../../../infrastructure/utils/log/logger';
import { GeneralResponse } from '../../interfaces/service/generalResponse';
import { HttpStatusCode } from '../../../infrastructure/utils/constants/httpStatusCode';
import { IDemandsRepository } from '../../interfaces/repository/DataBasic/IDemandsRepository';
import { DemandsDtoCreateResult } from '../../dtos/DataBasic/Demands/Demands/result/DemandsDtoCreateResult';
import { DemandsDtoCreate } from '../../dtos/DataBasic/Demands/Demands/DemandsDtoCreate';
import { DemandsDtoList } from '../../dtos/DataBasic/Demands/Demands/DemandsDtoList';

class DemandsRepository implements IDemandsRepository {
    async create(entity: DemandsDtoCreate): Promise<GeneralResponse> {
        try {
            const upsertReturn = await prismaClient.demands.create({
                data: {
                    name: entity.name,
                    description: entity.description,
                    status: entity.status,
                    category: entity.category,
                    typeService: entity.typeService,
                    addressId: entity.addressId,
                    ownerId: entity.ownerId
                }
            }) as DemandsDtoCreateResult

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
                    message: "Erro inesperado ao criar demanda.",
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
            const resultRead = await prismaClient.demands.findFirstOrThrow({
                where: {
                    id: id
                }
            }) as DemandsDtoList;

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
                    message: "Erro inesperado ao consultar demanda.",
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

    async readByOwnerId(ownerId: string): Promise<GeneralResponse> {
        try {
            const resultRead = await prismaClient.demands.findFirstOrThrow({
                where: {
                    ownerId: ownerId
                }
            }) as DemandsDtoList;

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
                    message: "Erro inesperado ao consultar demanda por dono.",
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

export { DemandsRepository }