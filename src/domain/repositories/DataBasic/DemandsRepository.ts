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
            const createReturn = await prismaClient.demands.create({
                data: {
                    name: entity.name,
                    description: entity.description,
                    status: entity.status,
                    category: entity.category,
                    typeService: entity.typeService,
                    addressId: entity.addressId,
                    ownerId: entity.ownerId
                },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    status: true,
                    category: true,
                    typeService: true,
                    address: true,
                    comments: true,
                    budgets: {
                        select: {
                            id: true,
                            description: true,
                            status: true,
                            value: true,
                            owner: {
                                select: {
                                    id: true,
                                    createdAt: true,
                                    email: true,
                                    tenant: true,
                                    role: true,
                                    typeUser: true,
                                    deleted: true,
                                    deletedAt: true
                                }
                            },
                            deleted: true,
                            deletedAt: true
                        }
                    },
                    owner: {
                        select: {
                            id: true,
                            createdAt: true,
                            email: true,
                            tenant: true,
                            role: true,
                            typeUser: true,
                            deleted: true,
                            deletedAt: true
                        }
                    },
                    deleted: true,
                    deletedAt: true
                }
            }) as DemandsDtoCreateResult

            return {
                success: true,
                statusCode: HttpStatusCode.OK,
                data: createReturn
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
                },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    status: true,
                    category: true,
                    typeService: true,
                    address: true,
                    comments: true,
                    budgets: {
                        select: {
                            id: true,
                            description: true,
                            status: true,
                            value: true,
                            owner: {
                                select: {
                                    id: true,
                                    createdAt: true,
                                    email: true,
                                    tenant: true,
                                    role: true,
                                    typeUser: true,
                                    deleted: true,
                                    deletedAt: true
                                }
                            }
                        }
                    },
                    owner: {
                        select: {
                            id: true,
                            createdAt: true,
                            email: true,
                            tenant: true,
                            role: true,
                            typeUser: true,
                            deleted: true,
                            deletedAt: true
                        }
                    },
                    deleted: true,
                    deletedAt: true
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
                },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    status: true,
                    category: true,
                    typeService: true,
                    address: true,
                    comments: true,
                    budgets: {
                        select: {
                            id: true,
                            description: true,
                            status: true,
                            value: true,
                            owner: {
                                select: {
                                    id: true,
                                    createdAt: true,
                                    email: true,
                                    tenant: true,
                                    role: true,
                                    typeUser: true
                                }
                            }
                        }
                    }, 
                    owner: {
                        select: {
                            id: true,
                            createdAt: true,
                            email: true,
                            tenant: true,
                            role: true,
                            typeUser: true
                        }
                    }
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

    async update(entity: DemandsDtoCreate): Promise<GeneralResponse> {
        try {
            const resultUpdate = await prismaClient.demands.update({
                where: {
                    id: entity.id,
                },
                data: {
                    name: entity.name,
                    description: entity.description,
                    status: entity.status,
                    category: entity.category,
                    typeService: entity.typeService,
                    addressId: entity.addressId,
                    ownerId: entity.ownerId
                },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    status: true,
                    category: true,
                    typeService: true,
                    address: true,
                    comments: true,
                    budgets: {
                        select: {
                            id: true,
                            description: true,
                            status: true,
                            value: true,
                            owner: {
                                select: {
                                    id: true,
                                    createdAt: true,
                                    email: true,
                                    tenant: true,
                                    role: true,
                                    typeUser: true,
                                    deleted: true,
                                    deletedAt: true
                                }
                            },
                            deleted: true,
                            deletedAt: true
                        }
                    }, 
                    owner: {
                        select: {
                            id: true,
                            createdAt: true,
                            email: true,
                            tenant: true,
                            role: true,
                            typeUser: true,
                            deleted: true,
                            deletedAt: true
                        }
                    },
                    deleted: true,
                    deletedAt: true
                }
            }) as DemandsDtoList;

            return {
                success: true,
                statusCode: HttpStatusCode.OK,
                data: resultUpdate
            }
        } catch (error: any) { 
            Logger.error(error)

            return {
                success: false,
                error: {
                    message: "Erro inesperado ao atualizar demanda.",
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

    async delete(demandId: string): Promise<GeneralResponse> {
        try {
            await prismaClient.budgets.updateMany({
                where: {
                    demandId: demandId
                },
                data: {
                    deleted: true,
                    deletedAt: new Date()
                }
            })

            const resultDeleteDemand = await prismaClient.demands.update({
                where: {
                    id: demandId
                },
                data: {
                    deleted: true,
                    deletedAt: new Date(),
                    budgets: {
                        updateMany: {
                            where: {

                            },
                            data: {
                                deleted: true,
                                deletedAt: new Date(),
                            }
                        }
                    }
                },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    status: true,
                    category: true,
                    typeService: true,
                    address: true,
                    comments: true,
                    budgets: {
                        select: {
                            id: true,
                            description: true,
                            status: true,
                            value: true,
                            owner: {
                                select: {
                                    id: true,
                                    createdAt: true,
                                    email: true,
                                    tenant: true,
                                    role: true,
                                    typeUser: true,
                                    deleted: true,
                                    deletedAt: true
                                }
                            },
                            deleted: true,
                            deletedAt: true
                        }
                    }, 
                    owner: {
                        select: {
                            id: true,
                            createdAt: true,
                            email: true,
                            tenant: true,
                            role: true,
                            typeUser: true,
                            deleted: true,
                            deletedAt: true
                        }
                    },
                    deleted: true,
                    deletedAt: true
                }
            }) as DemandsDtoList;

            return {
                success: true,
                statusCode: HttpStatusCode.OK,
                data: resultDeleteDemand
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