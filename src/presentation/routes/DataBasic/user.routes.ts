import { Router, Request, Response } from 'express';
import { UserDtoCreate } from '../../../domain/dtos/DataBasic/User/UserDtoCreate';
import { UserRepository } from '../../../domain/repositories/DataBasic/UserRepository';
import { UserService } from '../../../service/DataBasic/UserService';
import { UserController } from '../../controllers/DataBasic/UserController';
import { validationToken } from '../../../infrastrutucture/utils/middleware/authHelper';

const userRouter = Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRouter.post('/user', (request: Request<{}, {}, UserDtoCreate>, response: Response) => {
    return userController.create(request, response);
});

userRouter.get('/user/me', validationToken, (request: Request, response: Response) => {
    return userController.readMe(request, response);
});

userRouter.get('/user/:id', validationToken, (request: Request<{id: string}>, response: Response) => {
    return userController.read(request, response);
});

export { userRouter }