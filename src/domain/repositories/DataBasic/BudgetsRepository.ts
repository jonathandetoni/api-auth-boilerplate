import { prismaClient } from '../../../infrastructure/config/database/prismaClient';
import { LogLevelEnum, Logger } from '../../../infrastructure/utils/log/logger';
import { GeneralResponse } from '../../interfaces/service/generalResponse';
import { HttpStatusCode } from '../../../infrastructure/utils/constants/httpStatusCode';
import { IBudgetsRepository } from '../../interfaces/repository/DataBasic/IBudgetsRepository';
import { BudgetsDtoCreate } from '../../dtos/DataBasic/Demands/Budgets/BudgetsDtoCreate';
import { BudgetsDtoCreateResult } from '../../dtos/DataBasic/Demands/Budgets/result/BudgetsDtoCreateResult';
import { BudgetsDtoList } from '../../dtos/DataBasic/Demands/Budgets/BudgetsDtoList';

class BudgetsRepository implements IBudgetsRepository {
    async create(entity: BudgetsDtoCreate): Promise<GeneralResponse> {
        try {
            const createReturn = await prismaClient.budgets.create({
              data: {
                description: entity.description,
                status: entity.status,
                value: entity.value,
                ownerId: entity.ownerId,
                demandId: entity.demandId
              },
              select: {
                id: true,
                createdAt: true,
                description: true,
                status: true,
                value: true,
                demand: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        status: true,
                        category: true,
                        typeService: true,
                        address: true,
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
            }) as BudgetsDtoCreateResult;

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
                    message: "Erro inesperado ao criar orçamento.",
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
            const resultRead = await prismaClient.budgets.findFirstOrThrow({
                where: {
                    id: id
                },
                select: {
                    id: true,
                    createdAt: true,
                    description: true,
                    status: true,
                    value: true,
                    demand: {
                        select: {
                            id: true,
                            deleted: true,
                            deletedAt: true,
                            name: true,
                            description: true,
                            status: true,
                            category: true,
                            typeService: true,
                            comments: false,
                            budgets: false
                        }
                    },
                    owner: {
                        select: {
                            id: true,
                            createdAt: true,
                            deleted: true,
                            deletedAt: true,
                            email: true,
                            tenant: true,
                            role: true,
                            typeUser: true
                        }
                    },
                    deleted: true,
                    deletedAt: true
                }
            }) as BudgetsDtoList;

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
                    message: "Erro inesperado ao consultar orçamento.",
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
            const resultRead = await prismaClient.budgets.findFirstOrThrow({
                where: {
                    ownerId: ownerId
                },
                select: {
                    id: true,
                    createdAt: true,
                    description: true,
                    status: true,
                    value: true,
                    demand: {
                        select: {
                            id: true,
                            name: true,
                            description: true,
                            status: true,
                            category: true,
                            typeService: true,
                            address: true,
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
            }) as BudgetsDtoList;

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
                    message: "Erro inesperado ao consultar orçamento por dono.",
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

    async readByDemandId(demandId: string): Promise<GeneralResponse> {
        try {
            const resultRead = await prismaClient.budgets.findFirstOrThrow({
                where: {
                    demandId: demandId
                },
                select: {
                    id: true,
                    createdAt: true,
                    description: true,
                    status: true,
                    value: true,
                    demand: {
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
            }) as BudgetsDtoList;

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
                    message: "Erro inesperado ao consultar orçamento por demanda.",
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
    async update(entity: BudgetsDtoCreate): Promise<GeneralResponse> {
        try {
            const createReturn = await prismaClient.budgets.update({
              where: {
                id: entity.id,
              },
              data: {
                description: entity.description,
                status: entity.status,
                value: entity.value,
                ownerId: entity.ownerId,
                demandId: entity.demandId
              },
              select: {
                id: true,
                createdAt: true,
                description: true,
                status: true,
                value: true,
                demand: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        status: true,
                        category: true,
                        typeService: true,
                        address: true,
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
            }) as BudgetsDtoList;

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
                    message: "Erro inesperado ao atualizar orçamento.",
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

    async delete(budgetId: string) : Promise<GeneralResponse> {
        try {
            const deleteResult = await prismaClient.budgets.update({
                where: {
                    id: budgetId
                },
                data: {
                    deleted: true,
                    deletedAt: new Date()
                },
                select: {
                    id: true,
                    createdAt: true,
                    description: true,
                    status: true,
                    value: true,
                    demand: {
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
            }) as BudgetsDtoList;

            return {
                success: true,
                statusCode: HttpStatusCode.OK,
                data: deleteResult
            } 
        } catch (error: any) {
            Logger.error(error)

            return {
                success: false,
                error: {
                    message: "Erro inesperado ao deletar orçamento.",
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

export { BudgetsRepository }