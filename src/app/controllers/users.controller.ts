import { Get, JsonController, Req, Res, Post, UseBefore, Body } from 'routing-controllers'
import { BaseController } from './base.controller'
import { Service } from 'typedi'
import UserServices from '@services/users.service'
import validationMiddleware from '@middlewares/validation.middleware'
import { CreateUserDto, UserLoginDto, ReceiveVoucherDto } from 'dtos/users.dto'
import { AdminMiddleware } from '@middlewares/checkAdmin.middleware'
import { RequestWithUser } from '@interfaces/auth.interface'
import { UserMiddleware } from '@middlewares/checkUser.middleware'

@JsonController('/user')
@Service()
export class UsersController extends BaseController {
  constructor(protected userServices: UserServices) {
    super()
  }

  @UseBefore(AdminMiddleware)
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

  @Post('/login')
  @UseBefore(validationMiddleware(UserLoginDto, 'body'))
  async userLogin(@Body() body: UserLoginDto, @Req() req: any, @Res() res: any) {
    const jwt = await this.userServices.userLogin(body)

    return this.responseSuccess(jwt, 'Success', res)
  }

  @Post('/receive-voucher')
  @UseBefore(UserMiddleware)
  @UseBefore(validationMiddleware(ReceiveVoucherDto, 'body'))
  async receiveVoucher(
    @Body() body: ReceiveVoucherDto,
    @Req() req: RequestWithUser,
    @Res() res: any,
  ) {
    await this.userServices.receiveVoucher(body.voucherId, req.user.id)

    return this.responseSuccess([], 'Success', res)
  }
}

export default UsersController
