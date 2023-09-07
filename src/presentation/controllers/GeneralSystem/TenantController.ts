import { Request, Response } from 'express';
import { statusCode } from '../../../infrastructure/utils';
import { Logger } from '../../../infrastructure/utils/log/logger';
import { ITenantService } from '../../../domain/interfaces/service/GeneralSystem/ITenantService';
import { TenantDtoCreate } from '../../../domain/dtos/GeneralSystem/Tenant/TenantDtoCreate';

class TenantController {
    private readonly _service: ITenantService;

    constructor(service: ITenantService){
        this._service = service;
    }

    async create(request: Request<{}, {}, TenantDtoCreate>, response: Response) : Promise<Response> {
        try {
            const entity: TenantDtoCreate = request.body;
            console.log(entity)
            const result = await this._service.create(entity);

            return response.status(statusCode.SUCCESS_REQUEST_CODE).json(result);
        } catch (error) {
            Logger.error(error)
            
            return response.status(statusCode.BAD_REQUEST_ERROR_CODE).json(error);
        }
    }

    async read(request: Request<{}, {}, {}, {id: string, name: string}>, response: Response) : Promise<Response> {
        const id = request.query.id
        const name = request.query.name
        let result;

        if(id != null){
            result = await this._service.read(id);
        } 

        if(name != null){
            result = await this._service.readByName(name);
        }

        if(name == null && id == null){
            return response.status(statusCode.BAD_REQUEST_ERROR_CODE).json("Parâmetro name ou id não encontrado!");
        }

        return response.status(statusCode.SUCCESS_REQUEST_CODE).json(result);
    }
}

export { TenantController }