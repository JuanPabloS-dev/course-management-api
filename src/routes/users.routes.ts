import { Router } from 'express';
import UserController from '../controllers/user.controller.ts';
import { asyncHandler } from '../utils/asyncHandler.ts';
import validate from '../middlewares/validation.middleware.ts';
import { loginSchema, registerSchema } from '../validations/user.validation.ts';

const userRouter = Router();

export default (controller: UserController) => {
    userRouter.post('/register', validate(registerSchema), asyncHandler(controller.register.bind(controller)));
    userRouter.post('/login', validate(loginSchema), asyncHandler(controller.login.bind(controller)));
    return userRouter;
}