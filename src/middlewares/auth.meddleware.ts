import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import env from '../config/env.ts'
import type { UserPayload } from '../types/express'
import UnauthorizedError from '../errors/unauthorized.error.ts'
import { th } from 'zod/locales'

const authenticationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedError('Token missing or malformed')
    }
    const token = authorization.split(' ')[1]
    if (!token) {
      throw new UnauthorizedError('Token missing or malformed')
    }
    const payload = jwt.verify(token, env.JWT_SECRET as string) as UserPayload
    if (typeof payload === 'string' || !payload) {
      throw new UnauthorizedError('Invalid token')
    }
    req.user = payload

    next()
  } catch (error) {
    throw new UnauthorizedError('Invalid token')
  }
}

export default authenticationMiddleware