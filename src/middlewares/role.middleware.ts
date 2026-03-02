import type { Request,Response,NextFunction } from "express";
import type { Role } from "../types/role";
import ForbiddenError from "../errors/forbidden.error.ts";

const roleGuard = (allowedRole: Role[])=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        if (!req.user)  throw new Error('Reole guard use without autentication')
        if(!allowedRole.includes(req.user.role)){
            throw new ForbiddenError('Forbidden: insufficient permissions')
        }
        next()
    }
}
export default roleGuard