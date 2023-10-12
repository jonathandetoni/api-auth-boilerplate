import { Request, Response } from 'express';
import { Logger } from '../../../infrastructure/utils/log/logger';
import { HttpStatusCode } from '../../../infrastructure/utils/constants/httpStatusCode';
import { GeneralResponse } from '../../../domain/interfaces/service/generalResponse';
import { IBudgetItemsService } from '../../../domain/interfaces/service/DataBasic/IBudgetItemsService';
import { BudgetItemsDtoCreate } from '../../../domain/dtos/DataBasic/Demands/BudgetItems/BudgetItemsDtoCreate';

class BudgetItemsController {
    private readonly _service: IBudgetItemsService;

    constructor(service: IBudgetItemsService){
        this._service = service;
    }

    async upsert(request: Request<{}, {}, BudgetItemsDtoCreate>, response: Response) : Promise<Response> {
        try {
            const entity: BudgetItemsDtoCreate = request.body;
            const result = await this._service.upsert(entity);

            return response.status(result.statusCode).json(result);
        } catch (error: any) {
            let result: GeneralResponse = {
                success: false,
                statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
                error: {
                    message: 'Erro inesperado!',
                    errorMessage: error.message,
                    details: [{
                        errorDetails: error
                    }]
                }
            }

            Logger.error(error)
            
            return response.status(result.statusCode).json(result);
        }
    }

    async read(request: Request<{}, {}, {}, {id: string, budgetId: string}>, response: Response) : Promise<Response> {
        try {
            const id = request.query.id
            const budgetId = request.query.budgetId
            let result: GeneralResponse;
            
            if(id == null && budgetId == null){
                result = {
                    success: false,
                    statusCode: HttpStatusCode.BAD_REQUEST,
                    error: {
                        message: 'Parâmetro id ou budgetId não encontrado!'
                    }
                }
                
                return response.status(result.statusCode).json(result);
            }

            if(id != null){
                result = await this._service.read(id)
                return response.status(result.statusCode).json(result);
            }

            result = await this._service.readByBudgetId(budgetId)
            return response.status(result.statusCode).json(result);
        } catch (error: any) {
            let result: GeneralResponse = {
                success: false,
                statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
                error: {
                    message: 'Erro inesperado!',
                    errorMessage: error.message,
                    details: [{
                        errorDetails: error
                    }]
                }
            }

            Logger.error(error)
            
            return response.status(result.statusCode).json(result);
        }
    }

    async delete(request: Request<{budgetItemId: string}>, response: Response): Promise<Response> {
        try {
            const { budgetItemId } = request.params;
            const result = await this._service.delete(budgetItemId)

            if(!result.success){
                return response.status(result.statusCode).json(result);
            }

            return response.status(result.statusCode).json(result);
        } catch (error: any) {
            let result: GeneralResponse = {
                success: false,
                statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
                error: {
                    message: 'Erro inesperado!',
                    errorMessage: error.message,
                    details: [{
                        errorDetails: error
                    }]
                }
            }

            Logger.error(error)
            
            return response.status(result.statusCode).json(result);
        }
    }
}

export { BudgetItemsController }