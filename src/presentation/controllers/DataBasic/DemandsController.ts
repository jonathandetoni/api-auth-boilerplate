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
        try {
            const entity: DemandsDtoCreate = request.body;
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

    async read(request: Request<{}, {}, {}, {id: string, ownerId: string}>, response: Response) : Promise<Response> {
        try {
            const id = request.query.id
            const ownerId = request.query.ownerId
            let result: GeneralResponse;

            if(ownerId == null && id == null){
                result = {
                    success: false,
                    statusCode: HttpStatusCode.BAD_REQUEST,
                    error: {
                        message: 'Parâmetro id ou ownerId não encontrado!'
                    }
                }
                
                return response.status(HttpStatusCode.BAD_REQUEST).json(result);
            }

            if(id != null){
                result = await this._service.read(id);
            } 

            result = await this._service.readByOwnerId(ownerId);

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
}

export { DemandsController }