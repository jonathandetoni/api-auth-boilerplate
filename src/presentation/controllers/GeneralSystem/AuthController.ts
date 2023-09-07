import { Request, Response } from 'express';
import { IAuthService } from '../../../domain/interfaces/service/GeneralSystem/IAuthService';
import { statusCode } from '../../../infrastructure/utils';
import { Logger } from '../../../infrastructure/utils/log/logger';
import { AuthDto } from '../../../domain/dtos/GeneralSystem/Auth/AuthDto';

class AuthController {
    private readonly _service: IAuthService;

    constructor(service: IAuthService){
        this._service = service;
    }

    async login(request: Request<{}, {}, AuthDto>, response: Response) : Promise<Response> {
        try {
            const entity: AuthDto = request.body;
            const result = await this._service.auth(entity);

            return response.status(statusCode.SUCCESS_REQUEST_CODE).json(result);
        } catch (error) {
            Logger.error(error)
            
            return response.status(statusCode.BAD_REQUEST_ERROR_CODE).json(error);
        }
    }
}

export { AuthController }