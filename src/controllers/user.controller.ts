import UserService from "../services/user.service.ts";
import type { Request, Response, NextFunction } from "express";
import BadRequestError from "../errors/bad-request.error.ts";

class UserController {
    private userService: UserService
    constructor(userService: UserService) {
        this.userService = userService;
    }

    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) throw new BadRequestError("Name, email and password are required");
            const user = await this.userService.register(name, email, password);
            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    }
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            if (!email || !password) throw new BadRequestError("Email and password are required");
            const result = await this.userService.login(email, password);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }

}


}

export default UserController;