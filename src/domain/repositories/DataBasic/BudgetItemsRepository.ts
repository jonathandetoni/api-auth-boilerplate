import { prismaClient } from '../../../infrastructure/config/database/prismaClient';
import { LogLevelEnum, Logger } from '../../../infrastructure/utils/log/logger';
import { GeneralResponse } from '../../interfaces/service/generalResponse';
import { HttpStatusCode } from '../../../infrastructure/utils/constants/httpStatusCode';
import { IBudgetItemsRepository } from '../../interfaces/repository/DataBasic/IBudgetItemsRepository';
import { BudgetItemsDtoCreate } from '../../dtos/DataBasic/Demands/BudgetItems/BudgetItemsDtoCreate';
import { BudgetItemsDtoCreateResult } from '../../dtos/DataBasic/Demands/BudgetItems/result/BudgetItemsDtoCreateResult';
import { BudgetItemsDtoList } from '../../dtos/DataBasic/Demands/BudgetItems/BudgetItemsDtoList';
import { NIL as NIL_UUID } from 'uuid';

class BudgetItemsRepository implements IBudgetItemsRepository {
    async upsert(entity: BudgetItemsDtoCreate): Promise<GeneralResponse> {
        try {
            const upsertReturn = await prismaClient.budgetItems.upsert({
                where: {
                    id: !entity.id ? NIL_UUID : entity.id
                },
                update: {
                    name: entity.name,
                    description: entity.description,
                    value: entity.value,
                    status: entity.status
                },
                create: {
                    name: entity.name,
                    description: entity.description,
                    value: entity.value,
                    status: entity.status,
                    budgetId: entity.budgetId
                },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    value: true,
                    status: true,
                    budget: {
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
                            budgetItems: {
                                where: {
                                    NOT: {
                                        id: entity.id,
                                        name: entity.name,
                                        budgetId: entity.budgetId,
                                        description: entity.description,
                                        value: entity.value,
                                    }
                                },
                                select: {
                                    id: true,
                                    name: true,
                                    description: true,
                                    status: true,
                                    value: true,
                                    budget: false,
                                    createdAt: true,
                                    deleted: true,
                                    deletedAt: true
                                }
                            },
                            deleted: true,
                            deletedAt: true
                        }
                    },
                }
            }) as BudgetItemsDtoCreateResult

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
                    message: "Erro inesperado ao criar ou atualizar item de orçamento!",
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
            const resultRead = await prismaClient.budgetItems.findFirstOrThrow({
                where: {
                    id: id
                },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    value: true,
                    status: true,
                    budget: {
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
                            budgetItems: {
                                where: {
                                    NOT: {
                                        id: id,
                                    }
                                },
                                select: {
                                    id: true,
                                    name: true,
                                    description: true,
                                    status: true,
                                    value: true,
                                    budget: false,
                                    createdAt: true,
                                    deleted: true,
                                    deletedAt: true
                                }
                            },
                            deleted: true,
                            deletedAt: true
                        }
                    },
                }
            }) as BudgetItemsDtoList;

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
                    message: "Erro inesperado ao consultar item de orçamento!",
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

    async readByBudgetId(budgetId: string): Promise<GeneralResponse> {
        try {
            const resultRead = await prismaClient.budgetItems.findMany({
                where: {
                    budgetId: budgetId
                },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    value: true,
                    status: true,
                    budget: {
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
                            budgetItems: {
                                select: {
                                    id: true,
                                    name: true,
                                    description: true,
                                    status: true,
                                    value: true,
                                    budget: false,
                                    createdAt: true,
                                    deleted: true,
                                    deletedAt: true
                                }
                            },
                            deleted: true,
                            deletedAt: true
                        }
                    },
                }
            }) as BudgetItemsDtoList[];

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
                    message: "Erro inesperado ao consultar item de orçamento por orçamento!",
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

    async delete(id: string) : Promise<GeneralResponse> {
        try {
            const deleteResult = await prismaClient.budgetItems.update({
                where: {
                    id: id,
                },
                data: {
                    deleted: true,
                    deletedAt: new Date()
                }
            }) as BudgetItemsDtoList;

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
                    message: "Erro inesperado ao deletar item de orçamento!",
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

export { BudgetItemsRepository }