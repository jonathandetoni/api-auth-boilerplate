import { Request, Response } from 'express';
import { Logger } from '../../../infrastructure/utils/log/logger';
import { ITenantService } from '../../../domain/interfaces/service/GeneralSystem/ITenantService';
import { TenantDtoCreate } from '../../../domain/dtos/GeneralSystem/Tenant/TenantDtoCreate';
import { HttpStatusCode } from '../../../infrastructure/utils/constants/httpStatusCode';
import { GeneralResponse } from '../../../infrastructure/utils/generalResponse';

class TenantController {
    private readonly _service: ITenantService;

    constructor(service: ITenantService){
        this._service = service;
    }

    async create(request: Request<{}, {}, TenantDtoCreate>, response: Response) : Promise<Response> {
        try {
            const entity: TenantDtoCreate = request.body;
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

    async read(request: Request<{}, {}, {}, {id: string, name: string}>, response: Response) : Promise<Response> {
        try {
            const id = request.query.id
            const name = request.query.name
            let result: GeneralResponse;

            if(name == null && id == null){
                result = {
                    success: false,
                    statusCode: HttpStatusCode.BAD_REQUEST,
                    error: {
                        message: 'Parâmetro name ou id não encontrado!'
                    }
                }
                
                return response.status(HttpStatusCode.BAD_REQUEST).json(result);
            }

            if(id != null){
                result = await this._service.read(id);
            } 

            result = await this._service.readByName(name);

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

export { TenantController }