import { Get, JsonController, Req, Res, Post, UseBefore, Body } from 'routing-controllers'
import { BaseController } from './base.controller'
import { Service } from 'typedi'
import UserServices from '@services/users.service'
import validationMiddleware from '@middlewares/validation.middleware'
import { CreateUserDto } from 'dtos/users.dto'

@JsonController('/user')
@Service()
export class UsersController extends BaseController {
  constructor(protected userServices: UserServices) {
    super()
  }

  @Get('/list')
  async getUser(@Res() res: any) {
    const findAllUsersData = await this.userServices.getAll()

    return this.responseSuccess(findAllUsersData, 'Success', res)
  }

  @Post('/create')
  @UseBefore(validationMiddleware(CreateUserDto, 'body'))
  async createUser(@Body() body: CreateUserDto, @Req() req: any, @Res() res: any) {
    await this.userServices.createUser(body)

    return this.responseSuccess([], 'Success', res)
  }
}

export default UsersController
