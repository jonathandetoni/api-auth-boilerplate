import { GeneralResponse } from "../../../../infrastructure/utils/generalResponse";
import { AuthDto } from "../../../dtos/GeneralSystem/Auth/AuthDto";

export interface IAuthService {
    auth(entity: AuthDto) : Promise<GeneralResponse>;
}