import { AuthDto } from "../../../dtos/GeneralSystem/Auth/AuthDto";
import { GeneralResponse } from "../generalResponse";

export interface IAuthService {
    auth(entity: AuthDto) : Promise<GeneralResponse>;
}