import { Get, JsonController, Req, Res } from 'routing-controllers'
import { NextFunction } from 'express'
import { BaseController } from './base.controller'
import { Service } from 'typedi'
import UserRepository from '@repositories/user.repository'

@JsonController('/user')
@Service()
export class UsersController extends BaseController {
  constructor(protected userRepository: UserRepository) {
    super()
  }

  @Get('/list')
  async getUser(@Req() req: any, @Res() res: any, next: NextFunction) {
    const findAllUsersData = await this.userRepository.getAll()

    return this.responseSuccess(findAllUsersData, 'Success', res)
  }
}

export default UsersController
