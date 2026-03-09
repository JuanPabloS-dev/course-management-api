import BaseError from "../errors/base.error.ts";
import type { Request, Response, NextFunction } from 'express'

const errorHandlerMiddleware = (error:Error,req:Request,res:Response,next:NextFunction)=>{
    if (error instanceof BaseError && error.isOperational) {
        return res.status(error.status).json({ message: error.message })
    }
    res.status(500).json({ message: 'Internal Server Error' })
}

export default errorHandlerMiddleware