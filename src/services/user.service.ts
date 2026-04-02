import type { UsersRepository } from "../types/users.types";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "../config/env.ts";
import BadRequestError from "../errors/bad-request.error.ts";
import UnauthorizedError from "../errors/unauthorized.error.ts";

class UserService {
  private userRepo: UsersRepository;

  constructor(userRepo: UsersRepository) {
    this.userRepo = userRepo;
  }
async register(name: string, email: string, password: string) {
  const userExist = await this.userRepo.findByEmail(email);

  if (userExist) {
    throw new Error("user already exist");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await this.userRepo.create({
    name,
    email,
    password: hashedPassword
  });


  return user;
}

  async login(email: string, password: string) {
    const user = await this.userRepo.findByEmail(email);

    if (!user) {
      throw new UnauthorizedError("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedError("Invalid credentials");
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      env.JWT_SECRET as string,
      {
        expiresIn: (env.JWT_EXPIRES_IN || "1h") as any,
      }
    );

    return { token };
  }
}

export default UserService;