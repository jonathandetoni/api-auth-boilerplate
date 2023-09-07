import { Request, Response } from 'express';
import { statusCode } from '../../../infrastrutucture/utils';
import { Logger } from '../../../infrastrutucture/utils/log/logger';
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

    async read(request: Request<{id: string}>, response: Response) : Promise<Response> {
        const { id } = request.params
        
        if(id != null)
        {
            var result = await this._service.read(id);
        } else {
            return response.status(statusCode.BAD_REQUEST_ERROR_CODE).json("Parâmetro id não encontrado!");
        }

        return response.status(statusCode.SUCCESS_REQUEST_CODE).json(result);
    }

    async readByName(request: Request<{name: string}>, response: Response) : Promise<Response> {
      const { name } = request.params
      
      if(name != null)
      {
          var result = await this._service.readByName(name);
      } else {
          return response.status(statusCode.BAD_REQUEST_ERROR_CODE).json("Parâmetro name não encontrado!");
      }

      return response.status(statusCode.SUCCESS_REQUEST_CODE).json(result);
  }
}

export { TenantController }