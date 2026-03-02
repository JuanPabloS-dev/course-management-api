import type { Role } from "./role"

export interface UserPayload{
    id:string,
    role:Role
}

declare global {
    namespace Express{
        interface Request{
            user? : UserPayload
        }
    }
}