import { Request, Response } from 'express';
import { Logger } from '../../../infrastructure/utils/log/logger';
import { HttpStatusCode } from '../../../infrastructure/utils/constants/httpStatusCode';
import { GeneralResponse } from '../../../domain/interfaces/service/generalResponse';
import { IBudgetsService } from '../../../domain/interfaces/service/DataBasic/IBudgetsService';
import { BudgetsDtoCreate } from '../../../domain/dtos/DataBasic/Demands/Budgets/BudgetsDtoCreate';

class BudgetsController {
    private readonly _service: IBudgetsService;

    constructor(service: IBudgetsService){
        this._service = service;
    }

    async create(request: Request<{}, {}, BudgetsDtoCreate>, response: Response) : Promise<Response> {
        try {
            const entity: BudgetsDtoCreate = request.body;
            const result = await this._service.create(entity);

            return response.status(HttpStatusCode.OK).json(result);
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
            
            return response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(result);
        }
    }

    async read(request: Request<{}, {}, {}, {id: string, ownerId: string, demandId: string}>, response: Response) : Promise<Response> {
        try {
            const id = request.query.id
            const ownerId = request.query.ownerId
            const demandId = request.query.demandId
            
            if(ownerId == null && id == null && demandId == null){
                let result: GeneralResponse = {
                    success: false,
                    statusCode: HttpStatusCode.BAD_REQUEST,
                    error: {
                        message: 'Parâmetro id, ownerId ou demandId não encontrado!'
                    }
                }
                
                return response.status(HttpStatusCode.BAD_REQUEST).json(result);
            }

            if(id != null){
                return response.status(HttpStatusCode.OK).json(await this._service.read(id));
            } 

            if(ownerId != null){
                return response.status(HttpStatusCode.OK).json(await this._service.readByOwnerId(ownerId)); 
            }

            return response.status(HttpStatusCode.OK).json(await this._service.readByDemandId(demandId));
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

    async update(request: Request<{}, {}, BudgetsDtoCreate>, response: Response) : Promise<Response> {
        try {
            const entity: BudgetsDtoCreate = request.body;

            if (!entity.id) {
                let result: GeneralResponse = {
                    statusCode: HttpStatusCode.BAD_REQUEST,
                    success: false,
                    error: {
                        message: "Para atualizar o orçamento é preciso enviar o id."
                    }
                }

                return response.status(result.statusCode).json(result)
            }
            const result = await this._service.update(entity);

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

    async delete(request: Request<{budgetId: string}>, response: Response): Promise<Response> {
        try {
            const { budgetId } = request.params;
            const result = await this._service.delete(budgetId)

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

export { BudgetsController }