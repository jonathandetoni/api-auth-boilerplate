import { Router, Request, Response } from 'express';
import { AuthController } from '../../controllers/AuthController';
import { AuthDto } from '../../../domain/dtos/GeneralSystem/Auth/AuthDto';
import { AuthService } from '../../../service/AuthService';
import { UserRepository } from '../../../domain/repositories/UserRepository';
import { UserController } from '../../controllers/UserController';
import { UserService } from '../../../service/UserService';

const authRouter = Router();

const userRepository = new UserRepository();

const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

const userService = new UserService(userRepository)
const userController = new UserController(userService);

authRouter.post('/login', (request: Request<{}, {}, AuthDto>, response: Response) => {
    return authController.login(request, response);
});

authRouter.get('/me', (request: Request, response: Response) => {
    return userController.readMe(request, response);
});

export { authRouter }