import { Get, Post, JsonController, Req, Res } from 'routing-controllers'
import { NextFunction } from 'express'
import { ExpressMiddlewareInterface } from 'routing-controllers'
import { Service } from 'typedi'
import { HttpException } from '@exceptions/http.exception'
import jwt, { Secret, JwtPayload } from 'jsonwebtoken'

@Service()
export class UserMiddleware implements ExpressMiddlewareInterface {
  async use(@Req() req: any, @Res() res: any, next: NextFunction): Promise<any> {
    const bearer = req.headers.authorization
    if (!bearer || !bearer.startsWith('Bearer ')) {
      return next(new HttpException(401, 'Unauthorised'))
    }
    const accessToken = bearer.split('Bearer ')[1].trim()
    try {
      const dataUser: any = jwt.verify(accessToken, process.env.JWT_SECRET)

      if (!dataUser) {
        return next(new HttpException(401, 'Not user'))
      }

      req.user = dataUser

      if (dataUser.role == 'admin') {
        return next()
      }

      if (dataUser.role != 'user') {
        return next(new HttpException(401, 'Not user'))
      }

      return next()
    } catch (error) {
      return next(new HttpException(401, 'Unauthorised'))
    }
  }
}
