import { Request, Response, response } from 'express';
import { UserDtoCreate } from '../../../domain/dtos/DataBasic/User/UserDtoCreate';
import { IUserService } from '../../../domain/interfaces/service/DataBasic/IUserService';
import { Logger } from '../../../infrastructure/utils/log/logger';
import { HttpStatusCode } from '../../../infrastructure/utils/constants/httpStatusCode';
import { GeneralResponse } from '../../../domain/interfaces/service/generalResponse';

class UserController {
    private readonly _service: IUserService;

    constructor(service: IUserService){
        this._service = service;
    }

    async create(request: Request<{}, {}, UserDtoCreate>, response: Response) : Promise<Response> {
        try {
            const entity: UserDtoCreate = request.body;
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

    async read(request: Request<{id: string}>, response: Response) : Promise<Response> {
        try {
            const { id } = request.params
        
            if(id != null)
            {
                var result = await this._service.read(id);
            } else {
                return response.status(HttpStatusCode.BAD_REQUEST).json("Parâmetro id não encontrado!");
            }

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

    async readMe(request: Request, response: Response) : Promise<Response> {
        try {
            let result: GeneralResponse
            const token = request.header('Authorization')?.replace('Bearer ', '');

            if(token) {
                result = await this._service.me(token);
                return response.status(HttpStatusCode.OK).json(result);
            } else  {
                result = {
                    success: false,
                    statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
                    error: {
                        message: 'Token não encontrado'
                    }
                }

                return response.status(HttpStatusCode.BAD_REQUEST).json(result);
            }
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

export { UserController }