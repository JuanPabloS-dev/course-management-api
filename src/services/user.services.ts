import UserRepository from "../repositories/user.repository.ts";
import bcrypt from "bcrypt";

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
}
export default UserService