import { Router } from 'express';
import UserController from '../controllers/user.controller.ts';

const userRouter = Router();

export default (controller: UserController) => {
    userRouter.post('/register', controller.register.bind(controller));
    userRouter.post('/login', controller.login.bind(controller));
    return userRouter;
}