import UserRepository from "../repositories/user.repository.ts";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import env from "../config/env.ts";

class UserService {
    private userRepo:UserRepository;
    constructor(userRepo:UserRepository){
        this.userRepo = userRepo
    }
  
  async register(name: string, email: string, password: string) {
    const userExist = await this.userRepo.findByEmail(email);
    if (userExist) throw new Error("user already exist");
    const saltRounds: number = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = this.userRepo.create(name, email, hashedPassword);
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.userRepo.findByEmail(email)
    if (!user) throw new Error('invalid credentials')
    const isMatch = await bcrypt.compare(password,user.password)
    if (!isMatch) throw new Error('invalid credentials')
    const token = jwt.sign(
        {
            id:user.id,
            role:user.role
        },
        env.JWT_SECRET as string,
        {
            expiresIn: (env.JWT_EXPIRES_IN || "1h") as any
        }
        )
        return {token}

  }
}


export default UserService