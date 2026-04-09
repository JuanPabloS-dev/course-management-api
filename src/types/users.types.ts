export interface UsersRepository {
    create(data: CreateUserInput): Promise<User>,
    findByEmail(email: string): Promise<UserWithPassword | null>
    findById(id: string): Promise<UserWithPassword | null>
}

export type User = {
    id: string,
    name: string,
    email: string,
    role: string,
    createdAt: Date
}
export type UserWithPassword = User & {
  password: string
}
export type CreateUserInput = {
    name: string,
    email: string,
    password: string
}

export type LoginInput = {
    email: string,
    password: string
}

