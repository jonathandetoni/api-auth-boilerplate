import { Request, Response } from 'express';
import { Logger } from '../../../infrastructure/utils/log/logger';
import { HttpStatusCode } from '../../../infrastructure/utils/constants/httpStatusCode';
import { GeneralResponse } from '../../../domain/interfaces/service/generalResponse';
import { IDemandsService } from '../../../domain/interfaces/service/DataBasic/IDemandsService';
import { DemandsDtoCreate } from '../../../domain/dtos/DataBasic/Demands/Demands/DemandsDtoCreate';

class DemandsController {
    private readonly _service: IDemandsService;

    constructor(service: IDemandsService){
        this._service = service;
    }

    async create(request: Request<{}, {}, DemandsDtoCreate>, response: Response) : Promise<Response> {
        let result: GeneralResponse;

        try {
            const entity: DemandsDtoCreate = request.body;
            result = await this._service.create(entity);

            return response.status(result.statusCode).json(result);
        } catch (error: any) {
            let result: GeneralResponse = {
                success: false,
                statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
                error: {
                    message: 'Erro inesperado ao cadastrar demanda!',
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

    async read(request: Request<{}, {}, {}, {id: string, ownerId: string}>, response: Response) : Promise<Response> {
        let result: GeneralResponse;

        try {
            const id = request.query.id
            const ownerId = request.query.ownerId

            if(ownerId == null && id == null){
                result = {
                    success: false,
                    statusCode: HttpStatusCode.BAD_REQUEST,
                    error: {
                        message: 'Parâmetro id ou ownerId não encontrado!'
                    }
                }
                
                return response.status(result.statusCode).json(result);
            }

            if(id != null){
                result = await this._service.read(id);
                return response.status(result.statusCode).json(result);
            }

            result = await this._service.readByOwnerId(ownerId);
            return response.status(result.statusCode).json(result);
        } catch (error: any) {
            result = {
                success: false,
                statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
                error: {
                    message: 'Erro inesperado ao consultar demanda!',
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

    async delete(request: Request<{demandId: string}>, response: Response): Promise<Response> {
        let result: GeneralResponse

        try {
            const { demandId } = request.params;
            result = await this._service.delete(demandId)

            if(!result.success){
                return response.status(result.statusCode).json(result);
            }

            return response.status(result.statusCode).json(result);
        } catch (error: any) {
            result = {
                success: false,
                statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
                error: {
                    message: 'Erro inesperado ao deletar demanda!',
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

    async update(request: Request<{}, {}, DemandsDtoCreate>, response: Response): Promise<Response> { 
        let result: GeneralResponse;
        
        try {
            const entity: DemandsDtoCreate = request.body;
            result = await this._service.update(entity);

            return response.status(result.statusCode).json(result);
        } catch (error: any) {
            result = {
                success: false,
                statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
                error: {
                    message: 'Erro inesperado ao atualizar demanda!',
                    errorMessage: error.message,
                    details: [{
                        errorDetails: error
                    }]
                }
            }

            Logger.error(error);

            return response.status(result.statusCode).json(result);
        }
    }

    async acceptBudget(request: Request<{demandId: string, budgetId: string}>, response: Response): Promise<Response> {
        let result: GeneralResponse;
        
        try {
            const { demandId, budgetId } = request.params;
            result = await this._service.acceptBudget(demandId, budgetId);

            return response.status(result.statusCode).json(result);
        } catch (error: any) {
            result = {
                success: false,
                statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
                error: {
                    message: 'Erro inesperado ao aceitar orçamento da demanda!',
                    errorMessage: error.message,
                    details: [{
                        errorDetails: error
                    }]
                }
            }

            Logger.error(error);

            return response.status(result.statusCode).json(result);
        }
    }
}

export { DemandsController }