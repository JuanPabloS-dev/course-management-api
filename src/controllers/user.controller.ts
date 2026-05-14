import UserService from "../services/user.service.ts";
import type { Request, Response, NextFunction } from "express";
import validateRegister from "../validators/users/validateRegister.ts";
import validateLogin from "../validators/users/validateLogin.ts";

class UserController {
    private userService: UserService
    constructor(userService: UserService) {
        this.userService = userService;
    }

    async register(req: Request, res: Response, next: NextFunction) {
        const dto = validateRegister(req.body);
        const user = await this.userService.register(dto.name, dto.email, dto.password);
        res.status(201).json(user);

    }
    async login(req: Request, res: Response, next: NextFunction) {
        const dto = validateLogin(req.body);
        const token = await this.userService.login(dto.email, dto.password);
        res.json({ token });    

}


}

export default UserController;