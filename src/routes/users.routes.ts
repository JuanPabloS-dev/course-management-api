import { Router } from 'express';
import UserController from '../controllers/user.controller.ts';
import { asyncHandler } from '../utils/asyncHandler.ts';

const userRouter = Router();

export default (controller: UserController) => {
    userRouter.post('/register', asyncHandler(controller.register.bind(controller)));
    userRouter.post('/login', asyncHandler(controller.login.bind(controller)));
    return userRouter;
}