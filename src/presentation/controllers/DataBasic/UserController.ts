import { Request, Response, response } from 'express';
import { UserDtoCreate } from '../../../domain/dtos/DataBasic/User/UserDtoCreate';
import { IUserService } from '../../../domain/interfaces/service/DataBasic/IUserService';
import { statusCode } from '../../../infrastrutucture/utils';
import { Logger } from '../../../infrastrutucture/utils/log/logger';

class UserController {
    private readonly _service: IUserService;

    constructor(service: IUserService){
        this._service = service;
    }

    async create(request: Request<{}, {}, UserDtoCreate>, response: Response) : Promise<Response> {
        try {
            const entity: UserDtoCreate = request.body;
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

    async readMe(request: Request, response: Response) : Promise<Response> {
        const token = request.header('Authorization')?.replace('Bearer ', '');

        if(token) {
            const result = await this._service.me(token);
            return response.status(statusCode.SUCCESS_REQUEST_CODE).json(result);
        } else  {
            return response.status(statusCode.BAD_REQUEST_ERROR_CODE).json("Token não encontrado!");
        }
    }
}

export { UserController }