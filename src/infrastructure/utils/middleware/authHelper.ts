import bcrypt from 'bcrypt';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { getEnv } from '../../config/env'
import { UserDtoList } from '../../../domain/dtos/DataBasic/User/UserDtoList';
import { HttpStatusCode } from '../constants/httpStatusCode';
import { LogLevelEnum } from '../log/logger';

const salt = bcrypt.genSaltSync(10);
const SECRET_KEY: Secret = getEnv().JWT_SECRET as Secret;

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hashSync(password, salt);
}

export const comparePasswords = async (password: string, passwordCompare?: string): Promise<boolean> => {
  if(passwordCompare) 
    return bcrypt.compareSync(password, passwordCompare);

  return false
}

export const jwtSign = async (payload: string | object): Promise<string> => {
  return jwt.sign(payload, SECRET_KEY)
}

export const jwtDecode = async (token: string) => {
  const result = jwt.verify(token, SECRET_KEY)

  return result as UserDtoList;
}

export const validationToken = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  try {
    const token = request.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return next(
        {
            success: false,
            error: {
                message: "Erro inesperado ao fazer validação do token!",
                errorMessage: "Erro inesperado ao fazer validação do token!",
                details: [{
                    errorDetails: "Erro inesperado ao fazer validação do token!",
                    typeError: LogLevelEnum.ERROR    
                }]
            },
            statusCode: HttpStatusCode.BAD_REQUEST
        }
      );
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    (request as CustomRequest).token = decoded;

    next();
  } catch (err) {
    response.status(HttpStatusCode.UNAUTHORIZED).send({
      success: false,
      error: {
          message: "Não autorizado!",
          errorMessage: "Não autorizado!",
          details: [{
              errorDetails: "Não autorizado!",
              typeError: LogLevelEnum.INFO    
          }]
      },
      statusCode: HttpStatusCode.BAD_REQUEST
  });
  }
};