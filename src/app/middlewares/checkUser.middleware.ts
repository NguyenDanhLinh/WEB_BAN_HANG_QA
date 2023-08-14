import { Get, Post, JsonController, Req, Res } from 'routing-controllers'
import { NextFunction } from 'express'
import { ExpressMiddlewareInterface } from 'routing-controllers'
import Container, { Service } from 'typedi'
import { HttpException } from '@exceptions/http.exception'
import jwt, { Secret, JwtPayload } from 'jsonwebtoken'
import UserRepository from '@repositories/user.repository'

const userRepository = Container.get(UserRepository)

@Service()
export class UserMiddleware implements ExpressMiddlewareInterface {
  async use(@Req() req: any, @Res() res: any, next: NextFunction): Promise<any> {
    const bearer = req.headers.authorization
    if (!bearer || !bearer.startsWith('Bearer ')) {
      return next(new HttpException(401, 'Unauthorised'))
    }
    const accessToken = bearer.split('Bearer ')[1].trim()
    try {
      const dataVerify: any = jwt.verify(accessToken, process.env.JWT_SECRET)

      const userId = dataVerify.id

      const dataUser = await userRepository.findById(userId)

      if (!dataUser.verify) {
        return next(new HttpException(401, 'Not verify email'))
      }

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
