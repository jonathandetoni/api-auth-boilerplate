import { Request, Response } from 'express';
import { IAuthService } from '../../../domain/interfaces/service/GeneralSystem/IAuthService';
import { Logger } from '../../../infrastructure/utils/log/logger';
import { AuthDto } from '../../../domain/dtos/GeneralSystem/Auth/AuthDto';
import { HttpStatusCode } from '../../../infrastructure/utils/constants/httpStatusCode';
import { GeneralResponse } from '../../../domain/interfaces/service/generalResponse';

class AuthController {
    private readonly _service: IAuthService;

    constructor(service: IAuthService){
        this._service = service;
    }

    async login(request: Request<{}, {}, AuthDto>, response: Response) : Promise<Response> {
        try {
            const entity: AuthDto = request.body;
            const result = await this._service.auth(entity);

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

export { AuthController }