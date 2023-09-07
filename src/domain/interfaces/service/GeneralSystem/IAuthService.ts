import { AuthDto, AuthDtoResult } from "../../../dtos/GeneralSystem/Auth/AuthDto";

export interface IAuthService {
    auth(entity: AuthDto) : Promise<AuthDtoResult>;
}