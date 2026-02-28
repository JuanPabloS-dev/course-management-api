import type { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import env from '../config/env'
import type { UserPayload } from '../types/express'

const authenticationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers

    if (!authorization || !authorization.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    const token = authorization.split(' ')[1]
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    const payload = verify(token, env.JWT_SECRET as string) as UserPayload
    if (typeof payload === 'string' || !payload) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    req.user = payload

    next()
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}

export default authenticationMiddleware